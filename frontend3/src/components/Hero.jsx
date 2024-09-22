import React from 'react';

const Hero = ({title,imageUrl}) => {
    return (
        <div className='hero container'>
            <div className="banner">
                <h1>{title} </h1>
                {/*<h4>Your Appointment Status : </h4>*/}                
                <p> NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY BENGALURU</p>
            </div>
            <div className="banner">
                <img src={imageUrl} alt='hero 'className='animated-image'/>
                <span>
                    <img src='/Vector.png' alt='vector'/>
                </span>
            </div>
            
        </div>
    );
};

export default Hero;