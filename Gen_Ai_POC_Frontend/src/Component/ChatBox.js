import React, { useState, useRef, useEffect } from "react";
import "./ChatBox.css";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "./Navbar";
import { FaRobot } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa6";
const ChatBox = ({ isAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatHistoryRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // Scroll to the last message when messages change
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Display the default assistant message when the component mounts
    const defaultAssistantMessage = {
      text: "I'm a Document Search Bot, and I'm here to help you to provide information for your queries. Ask me anything relevant to the content that you've provided! 🤖✨",
      type: "assistant",
    };
    setMessages([defaultAssistantMessage]);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Set loading to true
    setLoading(true);

    // Store the user message in state
    const newUserMessage = { text: input.trim(), type: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput("");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `"${input}"`,
    };

    try {
      const response = await fetch(
        "http://localhost:5253/api/Chat/ask",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      // Check if the response content is "No Content Found"
      if (result.content === "No Content Found") {
        // Display a specific message for irrelevant questions
        const irrelevantMessage = {
          text: "As of my knowledge, your question is irrelevant to the content I have. I can't provide information. Please ask a relevant question. 🤔🚫",
          type: "assistant",
        };
        setMessages((prevMessages) => [...prevMessages, irrelevantMessage]);
      } else {
        // Store the assistant content in state for other cases
        const newAssistantMessage = { text: result.content, type: "assistant" };
        setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);
      }

      // Store the assistant content in state
      // const newAssistantMessage = { text: result.content, type: "assistant" };
      // setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);
    } catch (error) {
      console.error("Error in API request:", error);
      // Display error message as an assistant-generated message
      const errorMessage = {
        text: "Oops! 😟 We ran into a problem. Please try again later.",
        type: "assistant",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      // Set loading back to false after API call completes
      setLoading(false);
    }

    // setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default behavior of the Enter key (e.g., new line in a textarea)
      handleSendMessage(); // Call the handleSendMessage function when Enter key is pressed
    }
  };

  return (
    <div className="chatbox-container">
      <div className="side-nav-left">
        <Navbar />
      </div>
      <div className="chat-container" ref={chatHistoryRef}>
        <div className="chat-history">
          {messages.map((message, index) => (
            // <div key={index} className={`message ${message.type}`}>
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`message ${message.type}`}
            >
              {message.type === "assistant" && (
                <FaRobot fontSize="small" style={{ marginRight: "5px" }} />
              )}

              {message.text}
              {message.type === "user" && (
                <FaUserNinja fontSize="small" style={{ marginRight: "5px" }} />
              )}
            </div>
          ))}
          {/* {loading && <div className="message system">Loading... </div>} */}
          {loading && (
            <div className="message system">
              {Array.from("........").map((letter, index) => (
                <strong key={index}>
                  <span
                    key={index}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className="wave"
                  >
                    {letter}
                  </span>
                </strong>
              ))}
              <style>
                {`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .message.system span {
          display: inline-block;
          animation: wave 1s infinite;
        }
      `}
              </style>
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your query..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="send-button" onClick={handleSendMessage}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
