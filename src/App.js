import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "https://chatbot-function.azurewebsites.net/api/chatbot",
        { message: input }
      );
      setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error reaching the server.", sender: "bot" }]);
    }
  };

  return (
    <div className="chat-container">
      <h2>🌈 AI Chatbot</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
