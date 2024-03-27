// // Login.js

// import React, { useState } from "react";
// import "./Login.css"; // Import the CSS file for styling

// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   //   const handleSubmit = (e) => {
//   //     e.preventDefault();
//   //     // Add your login logic here
//   //     console.log("Email:", email, "Password:", password);
//   //     // Reset the form after submission
//   //     setEmail("");
//   //     setPassword("");
//   //   };

//   const handleLogin = async () => {
//     const hardcodedEmail = "user@example.com";
//     const hardcodedPassword = "password123";
//     const isAdmin = false;

//     if (email === hardcodedEmail && password === hardcodedPassword) {
//       // Successful login logic
//       navigate("/chat", { state: { isAdmin } }); // Redirect to "/app" after successful login
//     } else {
//       setErrorMessage("Invalid email or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="left-section">
//         <div className="logo-text-container">
//           <img src="/document.png" alt="App Logo" className="app-logo" />

//           <h2>Document Search</h2>
//         </div>
//       </div>

//       <div className="right-section">
//         <div className="login-form-container">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin}>
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <button type="submit">Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

///////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import "./Login.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const apiUrl = "https://localhost:44363/api/Login"; // Replace with your actual API endpoint
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ usermail: email, password: password }),
//       });

//       console.log(response);

//       if (response.ok) {
//         const data = response.json();
//         console.log(data);
//         const isAdmin = data.isAdmin || false;
//         navigate("/chat", { state: { isAdmin } });
//       } else if (response.status === 400) {
//         setErrorMessage("UserMail and Password are required.");
//       } else if (response.status === 401) {
//         setErrorMessage("Invalid email or password");
//       } else {
//         setErrorMessage("An error occurred. Please try again.");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred. Please try again.");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="left-section">
//         <div className="logo-text-container">
//           <img src="/document.png" alt="App Logo" className="app-logo" />

//           <h2>Document Search</h2>
//         </div>
//       </div>

//       <div className="right-section">
//         <div className="login-form-container">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin}>
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <button className="login-btn" type="submit">
//               Login
//             </button>
//           </form>
//           {errorMessage && <div className="error-message">{errorMessage}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

/////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginTemplate.css";

const LoginTemplate = ({ onLoginSuccess, status }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!status) {
      localStorage.removeItem("loginStatus");
    }
  }, [status]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:5253/api/Login"; // Replace with your actual API endpoint
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usermail: email, password: password }),
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const isAdmin = data.isAdmin || false;
        localStorage.setItem("loginStatus", isAdmin);
        onLoginSuccess({ isAdmin });

        navigate("/home", { state: { isAdmin } });
      } else if (response.status === 400) {
        setErrorMessage("UserMail and Password are required.");
      } else if (response.status === 401) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg">
      <section className="vh-100" style={{ height: "75%", width: "100%" }}>
        <div className="container py-3 h-75">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-10 col-lg-7 carddiv">
              <div className="card ">
                <div className="row g-0">
                  <div className="col-md-7 col-lg-5 d-none d-md-block">
                    <img
                      src="./logo.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{
                        borderRadius: "2rem 1rem 1rem 2rem",
                        height: "100%",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleLogin}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h2 fw-bold mb-0">
                            Document Search{" "}
                          </span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block btn-zoom "
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        {errorMessage && (
                          <div className="small text-danger">
                            {errorMessage}
                          </div>
                        )}

                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginTemplate;
