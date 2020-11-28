import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('Loading');
  useEffect(() => {
    const loadMessage = async () => {
      const response = await fetch('.netlify/functions/todos-read-all');
      if (!response.ok) {
        setMessage('Error');
        return;
      }
      const message = await response.text();
      setMessage(message);
    };
    loadMessage();
  }, []);
  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default hot(module)(App);
