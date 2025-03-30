import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://chatbot-function.azurewebsites.net/api/chatbot"; // Replace with your actual API

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to send a message to the backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, { message: input });
      setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error reaching the server:", error);
      setMessages([...newMessages, { text: "⚠️ Server error. Try again!", sender: "bot" }]);
    } finally {
      setLoading(false);
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
        {loading && <div className="message bot">⏳ Thinking...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default App;
