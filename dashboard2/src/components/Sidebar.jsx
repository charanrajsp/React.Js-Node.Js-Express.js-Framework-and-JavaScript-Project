import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { TiHome } from 'react-icons/ti';
import { FaUserDoctor } from 'react-icons/fa6';
import { MdAddModerator } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { AiFillMessage } from 'react-icons/ai';
import { RiLogoutBoxFill } from 'react-icons/ri';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';



const Sidebar = () => {

    const [show, setShow] = useState(false);
     const { isAuthenticated, setIsAuthenticated } = useContext(Context);


     const navigateTo = useNavigate();

     const handleMouseEnter = (name) => {
      toast.info(name, {
        position:"top-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

     
     const gotoHomePage = () => {
        navigateTo
        ("/");
        setShow(!show);
    };

    const gotoDoctorsPage = () => {
        navigateTo("/doctors");
        setShow(!show);
      };
      const gotoMessagesPage = () => {
        navigateTo("/messages");
        setShow(!show);
      };
      const gotoAddNewDoctor = () => {
        navigateTo("/doctor/addnew");
        setShow(!show);
      };
      const gotoAddNewAdmin = () => {
        navigateTo("/admin/addnew");
        setShow(!show);
      };
      const handleLogout = async () => {
        await axios
          .get("http://localhost:4000/api/v1/user/admin/logout", {
            withCredentials: true,
          })
          .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      };
    
    return (
        <>
        <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} onMouseEnter={() => handleMouseEnter('Home')} />
          <FaUserDoctor onClick={gotoDoctorsPage} onMouseEnter={() => handleMouseEnter('Doctors')} />
          <MdAddModerator onClick={gotoAddNewAdmin} onMouseEnter={() => handleMouseEnter('Add Admin')} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} onMouseEnter={() => handleMouseEnter('Add Doctor')} />
          <AiFillMessage onClick={gotoMessagesPage} onMouseEnter={() => handleMouseEnter('Messages')} />
          <RiLogoutBoxFill onClick={handleLogout} onMouseEnter={() => handleMouseEnter('Logout')} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>

            
        </>
    );
};

export default Sidebar;