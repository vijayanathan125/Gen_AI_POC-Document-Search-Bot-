import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import LogoutModal from "./LogoutModal";

const Navbar = ({ isAdmin }) => {
  // console.log("NavBar", isAdmin);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem("loginStatus");

  // const handleLogout = () => {
  //   // Clear user-related data from local storage
  //   localStorage.removeItem("loginStatus");
  //   // Add any additional cleanup logic here

  //   // Redirect to the "/logout" route
  //   // You can use the useHistory hook to programmatically navigate
  //   // Note: Make sure to import useHistory from react-router-dom

  //   navigate("/logout");

  //   // For now, let's just log a message
  //   console.log("User logged out!");

  //   // Close the logout modal
  //   setLogoutModalOpen(false);
  // };

  return (
    <nav>
      <Link to="/home" className="title">
        Document Search Bot
      </Link>
      {/* <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/home" activeClassName="activeLink">
            <HomeIcon /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat" activeClassName="activeLink">
            <ChatIcon /> Chat
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/upload" activeClassName="activeLink">
            <FileUploadIcon />
            Upload Document
          </NavLink>
        </li> */}
        {loginStatus === "true" && (
          <li>
            <NavLink to="/upload" activeClassName="activeLink">
              <FileUploadIcon />
              Upload Document{isAdmin}
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/logout" activeClassName="activeLink">
            <LogoutIcon /> Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
