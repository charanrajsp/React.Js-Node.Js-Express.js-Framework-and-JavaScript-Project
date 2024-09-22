import React, { useContext, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DoctorsList from '../components/DoctorsList.jsx';
import { Context } from '../main.jsx';


const Departments = () => {
    const {isAuthenticated} =useContext(Context);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const departmentsArray = [
        { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
        { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
        { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
        { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
        { name: "Oncology", imageUrl: "/departments/onco.jpg" },
        { name: "Radiology", imageUrl: "/departments/radio.jpg" },
        { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
        { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
        { name: "ENT", imageUrl: "/departments/ent.jpg" },
    ];



    const responsive = {
        extraLarge: { breakpoint: { max: 3000, min: 1324 }, items: 4, slidesToSlide: 1 },
        large: { breakpoint: { max: 1324, min: 1005 }, items: 3, slidesToSlide: 1 },
        medium: { breakpoint: { max: 1005, min: 700 }, items: 2, slidesToSlide: 1 },
        small: { breakpoint: { max: 700, min: 0 }, items: 1, slidesToSlide: 1 },
    };


    const handleDepartmentClick = (departmentName) => {
        setSelectedDepartment(departmentName);
    };

    return (
        <div className="container departments">
            <h2>Departments</h2>
            <Carousel responsive={responsive} removeArrowOnDeviceType={["medium", "small"]}>
                {departmentsArray.map((depart, index) => (
                    <div className="card" key={index} onClick={() => handleDepartmentClick(depart.name)}>
                        <div className="depart-name">{depart.name}</div>
                        <img src={depart.imageUrl} alt={depart.name} />
                    </div>
                ))}
            </Carousel>
            {isAuthenticated && selectedDepartment && (
                <DoctorsList department={selectedDepartment} /> // Pass selected department to DoctorsList
            )}        
            </div>
    );
};

export default Departments;
