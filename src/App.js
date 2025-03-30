import React, { useState } from "react";

function App() {
  const [response, setResponse] = useState("");

  const fetchResponse = async () => {
    try {
      const res = await fetch("https://chatbot-function.azurewebsites.net/api/chatbot"); // Replace 'chatbot' with your function name
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Failed to fetch response from backend.");
    }
  };

  return (
    <div>
      <h1>Chatbot App</h1>
      <button onClick={fetchResponse}>Ask Chatbot</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;
