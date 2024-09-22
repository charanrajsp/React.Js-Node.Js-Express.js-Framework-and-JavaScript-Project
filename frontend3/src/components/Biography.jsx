import React from 'react';

const Biography = ({imageUrl}) => {
    return (
        <div className='container biography'>
            <div className="banner">
                <img src={imageUrl}  alt='abouImg'/>
            </div>
            <div className="banner">
                <p>Biography</p>
                <h3>Who we are</h3>
                <p>The Hospital Management System (HMS) is designed to simplify and enhance your experience within the hospital. 
                    Whether you are a patient, doctor, or hospital staff member, this system is tailored to meet your specific needs and ensure that hospital operations run smoothly.</p>
                <p>
                For patients, the HMS provides a convenient way to manage your healthcare. You can easily schedule appointments, access your medical records, and receive updates about your treatment. The system empowers you to take control of your health with features like appointment reminders, 
                online consultations, and secure communication with your healthcare providers.
                </p>
            </div>
            
        </div>
    );
};

export default Biography;