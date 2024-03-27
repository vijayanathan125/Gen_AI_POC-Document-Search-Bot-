// import "./App.css";
// import ChatBox from "./Component/ChatBox";
// import DocumentUpload from "./Component/DocumentUpload";
// import Navbar from "./Component/Navbar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import Login from "./Component/Login";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         {/* <SideNav /> */}
//         <Routes>
//           <Route path="/" element={<Login />} />
//           {/* <Route path="/Sidenav" element={<SideNav />} /> */}

//           <Route path="/chat" element={<ChatBox />} />
//           <Route path="/upload" element={<DocumentUpload />} />
//           <Route path="/navbar" element={<Navbar />}></Route>
//           <Route path="/logout" element={<Login />} />
//         </Routes>
//       </Router>

//       {/* <SideNav></SideNav> */}
//       {/* <AppRouter /> */}
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatBox from "./Component/ChatBox";
import DocumentUpload from "./Component/DocumentUpload";
import Navbar from "./Component/Navbar";
import LoginTemplate from "./Component/Login";
import Home from "./Component/Home";

const App = () => {
  // State to track user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //const isAdmin = localStorage.getItem("loginStatus");
  // Function to handle successful login
  const handleSuccessfulLogin = (adminStatus) => {
    setIsAuthenticated(true);
    setIsAdmin(adminStatus.isAdmin);
    // console.log(adminStatus.isAdmin);
  };

  // Custom ProtectedRoute component
  const ProtectedRoute = ({ element, path }) => {
    const isUploadRoute = path === "/upload";

    return isAuthenticated && (!isUploadRoute || isAdmin) ? (
      element
    ) : (
      <Navigate to="/" replace state={{ from: path }} />
    );
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginTemplate
                onLoginSuccess={handleSuccessfulLogin}
                status={true}
              />
            }
          />
          {/* Define your protected routes using the ProtectedRoute component */}
          <Route
            path="/chat"
            element={<ProtectedRoute element={<ChatBox />} path="/chat" />}
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute element={<DocumentUpload />} path="/upload" />
            }
          />
          <Route
            path="/navbar"
            element={
              <ProtectedRoute
                element={<Navbar isAdmin={isAdmin} />}
                path="/navbar"
              />
            }
          />
          <Route
            path="/home"
            element={<ProtectedRoute element={<Home />} path="/home" />}
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute
                element={
                  <LoginTemplate
                    onLoginSuccess={handleSuccessfulLogin}
                    status={false}
                  />
                }
                path="/logout"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
