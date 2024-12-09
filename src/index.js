import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import App from './App';
import { MqttProvider } from './context/MqttContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root container
root.render(
  <React.StrictMode>
    <MqttProvider>
      <App />
    </MqttProvider>
  </React.StrictMode>
);
