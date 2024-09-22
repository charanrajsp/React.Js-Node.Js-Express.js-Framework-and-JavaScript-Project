import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../main";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { GoCheckCircleFill } from 'react-icons/go';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { isAuthenticated, user } = useContext(Context);
    const [appointments, setAppointments] = useState([]);
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/appointment/getall",
                    { withCredentials: true }
                );
                setAppointments(data.appointments);
            } catch (error) {
                console.log("Some Error Occured", error);
                setAppointments([]);
            }
        };

        const fetchAppointmentCount = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/appointment/count",
                    { withCredentials: true }
                );
                setAppointmentCount(data.count);
            } catch (error) {
                console.log("Some Error Occurred", error);
            }
        };

        const fetchDoctorCount = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/doctor/doctorcount",
                    { withCredentials: true }
                );
                setDoctorCount(data.count);
            } catch (error) {
                console.log("Some Error Occurred", error);
            }
        };


        fetchAppointments();
        fetchAppointmentCount();
        fetchDoctorCount();
        //fetchAppointments();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
                { status },
                { withCredentials: true }
            );
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === appointmentId
                        ? { ...appointment, status }
                        : appointment
                )
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <>
            <section className="dashboard page">
                <div className="banner">
                    <div className="firstBox">
                        <img src="/doc.png" alt="docImg" />
                        <div className="content">
                            <div>
                                <p>Hello,</p>
                                <h5>
                                    {user && `${user.firstName} ${user.lastName}`}
                                </h5>
                            </div>
                            <p>
                               Welcome To NITTE MEENAKSHI INSTITUE OF TECHNOLOGY Dashboard
                            </p>
                        </div>
                    </div>
                    <div className="secondBox">
                        <p>Total Appointments</p>
                        <h3>{appointmentCount}</h3>
                    </div>
                    <div className="thirdBox">
                        <p>Registered Doctors</p>
                        <h3>{doctorCount}</h3>
                    </div>
                </div>

                <div className="banner">
                    <h5>Appointments</h5>
                    <div className='date-time'><h3>{currentTime.toLocaleDateString()}</h3><h3>{currentTime.toLocaleTimeString()}</h3></div>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Visited</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td data-label="Patient">{`${appointment.firstName} ${appointment.lastName}`}</td>
                                        <td data-label="Date">{appointment.appointment_date.substring(0, 16)}</td>
                                        <td data-label="Doctor">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                        <td data-label="Department">{appointment.department}</td>
                                        <td data-label="Status">
                                            <select
                                                className={
                                                    appointment.status === "Pending"
                                                        ? "value-pending"
                                                        : appointment.status === "Accepted"
                                                            ? "value-accepted"
                                                            : "value-rejected"
                                                }
                                                value={appointment.status}
                                                onChange={(e) =>
                                                    handleUpdateStatus(appointment._id, e.target.value)
                                                }
                                            >
                                                <option value="Pending" className="value-pending">
                                                    Pending
                                                </option>
                                                <option value="Accepted" className="value-accepted">
                                                    Accepted
                                                </option>
                                                <option value="Rejected" className="value-rejected">
                                                    Rejected
                                                </option>
                                            </select>
                                        </td>
                                        <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No Appointments Found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </section>
        </>
    );
};

export default Dashboard;
