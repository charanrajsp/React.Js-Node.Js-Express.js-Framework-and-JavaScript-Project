import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../main";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const { isAuthenticated } = useContext(Context);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/user/doctors",
                    { withCredentials: true }
                );
                setDoctors(data.doctors);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchDoctors();
    }, []);

    const handleDeleteDoctor = async (doctorId) => {
        try {
            await axios.delete(
                `http://localhost:4000/api/v1/doctor/delete/${doctorId}`,
                { withCredentials: true }
            );
           
            toast.success("Doctor deleted successfully.");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <>
            <section className="page doctors">
                <h1>DOCTORS</h1>
                <div className="banner">
                    {doctors && doctors.length > 0 ? (
                        doctors.map((doctor) => {
                            return (
                                <div className="card" key={doctor._id}>
                                    <img
                                        src={doctor.docAvatar && doctor.docAvatar.url}
                                        alt="doctor avatar"
                                    />
                                    <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
                                    <div className="details">
                                        <p>
                                            Email: <span>{doctor.email}</span>
                                        </p>
                                        <p>
                                            Phone: <span>{doctor.phone}</span>
                                        </p>
                                        <p>
                                            DOB: <span>{doctor.dob.substring(0, 10)}</span>
                                        </p>
                                        <p>
                                            Department: <span>{doctor.doctorDepartment}</span>
                                        </p>
                                        <p>
                                            NIC: <span>{doctor.nic}</span>
                                        </p>
                                        <p>
                                            Gender: <span>{doctor.gender}</span>
                                        </p>
                                        <button onClick={() => handleDeleteDoctor(doctor._id)} className='delete-button'>Delete Doctor</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h1>No Registered Doctors Found!</h1>
                    )}
                </div>
            </section>
        </>
    );
};

export default Doctors;
