import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMessage = { sender: "User", text: message };
    setChat([...chat, userMessage]);

    try {
      const response = await axios.post(
        "https://chatbot-function.azurewebsites.net/api/chatbot", 
        { message }
      );
      const botMessage = { sender: "Bot", text: response.data.reply };
      setChat([...chat, userMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message", error);
    }

    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Chatbot</h2>
        <div className="h-64 overflow-y-auto border p-2">
          {chat.map((msg, i) => (
            <div key={i} className={`p-2 ${msg.sender === "User" ? "text-right" : "text-left"}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
