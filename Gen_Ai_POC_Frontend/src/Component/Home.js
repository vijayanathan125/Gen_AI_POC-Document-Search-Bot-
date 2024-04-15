// Home.js

import React from "react";
import "./Home.css"; // Import your Home page styling
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="chatbox-container">
      <div className="side-nav-left">
        <Navbar />
      </div>
      <div className="home-container">
        <h1>Welcome to Document Search Application</h1>

        <div className="description">
          <p>
            Our application is designed to streamline document search processes.
            By leveraging AI models, the system can analyze and understand the
            content of provided documents.
          </p>

          <p>
            If you submit a document to the AI model, it will use that
            document's content as a reference. Users can then ask questions, and
            the system will respond based on the information present in the
            document.
          </p>
        </div>

        <div className="features">
          <h2>Key Features:</h2>
          <ul>
            <li>Efficient Document Search</li>
            <li>AI-Powered Content Understanding</li>
            <li>Question-Answering Capability</li>
            
          </ul>
        </div>

       
      </div>
    </div>
  );
};

export default Home;
