import React from 'react';
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";




const Home = () => {
    return (
        <div>
     <Hero title={"Welcome To NMIT Medical Institute | Your trusted Place"} 
     imageUrl={"/hero.jpg"}/>
     <Biography imageUrl={"/about.png"}/>
     <Departments/>
     <MessageForm/>
            
        </div>
    );
};

export default Home;