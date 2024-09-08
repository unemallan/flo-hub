import React from 'react';
import './App.css'; // Import CSS file
import logo from './logo.svg'; // Import logo

function App() {
  const checkLinkedInConnection = () => {
    // Logic to check if user is connected on LinkedIn
    var connected = Math.random() < 0.00; // 5% chance of being connected
    var resultMessage = connected ? "Yes, you are connected with me on LinkedIn!" : "No, you are not connected with me on LinkedIn. Connect now: <a href='https://www.linkedin.com/in/muhammad-rashid-daha/' target='_blank'>Follow me on LinkedIn</a>";
    document.getElementById("result").innerHTML = resultMessage;
  }
}

export default App;
