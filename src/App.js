import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "You", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    try {
      const response = await fetch("https://chatbot-function.azurewebsites.net/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      const botMessage = { sender: "Chatbot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "You" ? "user" : "bot"}`}>
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <style>{`
        .chat-container {
          max-width: 400px;
          margin: auto;
          display: flex;
          flex-direction: column;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
        }
        .chat-box {
          height: 300px;
          overflow-y: auto;
          padding: 10px;
          background: #f9f9f9;
        }
        .message {
          margin: 5px 0;
          padding: 8px;
          border-radius: 5px;
        }
        .user {
          background: #0078ff;
          color: white;
          text-align: right;
        }
        .bot {
          background: #e0e0e0;
          text-align: left;
        }
        .input-box {
          display: flex;
          padding: 10px;
          background: white;
        }
        .input-box input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .input-box button {
          margin-left: 5px;
          padding: 8px 12px;
          background: #0078ff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
