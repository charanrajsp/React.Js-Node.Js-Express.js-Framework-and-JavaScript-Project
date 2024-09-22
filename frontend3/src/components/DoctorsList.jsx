import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Departments.css';

const DoctorsList = ({ department }) => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/user/doctors', {params: { department },
                  withCredentials: true });
                setDoctors(response.data.doctors);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        if (department) {
            fetchDoctors();
        }
    }, [department]);

    return (
        <div className="doctors-list">
            <h3>Doctors in {department} Department</h3>
            {doctors.length > 0 ? (
                <div className="doctors-grid">
                    {doctors.map((doctor, index) => (
                        <div className="doctor-card" key={index}>
                            <img src={doctor.docAvatar.url} alt={`${doctor.firstName} ${doctor.lastName}`} />
                            <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
                            <p>Email: {doctor.email}</p>
                            <p>Phone: {doctor.phone}</p>
                            <p>Department: {doctor.doctorDepartment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No doctors found in this department.</p>
            )}
        </div>
    );
};

export default DoctorsList;
