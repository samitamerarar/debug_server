// react-app/src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [logData, setLogData] = useState([]);

  const fetchLogData = async () => {
    try {
      const response = await fetch("http://localhost:3150/api/log");
      if (response.ok) {
        const data = await response.json();
        setLogData(data);
      } else {
        console.error("Failed to fetch log data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleClearOutput = async () => {
    try {
      const response = await fetch("http://localhost:3150/api/clear", {
        method: "POST",
      });

      if (response.ok) {
        console.log("Output cleared successfully");
        setLogData([]);
      } else {
        console.error("Failed to clear output");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleRefresh = () => {
    fetchLogData();
  };

  useEffect(() => {
    fetchLogData();
  }, []);

  return (
    <div className="App">
      <h1>React App</h1>

      <h2>Received Data:</h2>
      {logData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Log</th>
            </tr>
          </thead>
          <tbody>
            {logData.map((item, index) => (
              <tr key={index}>
                <td>{item.timestamp}</td>
                <td>{item.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="placeholder">No data available</div>
      )}

      <button onClick={handleClearOutput}>Clear Output</button>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default App;
