// src/App.js
import React, { useContext, useEffect } from 'react';
import { MqttContext } from './context/MqttContext';
import useMqtt from './mqtt/useMqtt';

function App() {
  // Use the custom hook to subscribe to MQTT and update context
  useMqtt();

  const { mqttData } = useContext(MqttContext);

  useEffect(() => {
    console.log("MQTT Data:", mqttData);
  }, [mqttData]);

  return (
    <div>
      <h1>MQTT Data Display</h1>
      {mqttData["example/topic"] ? (
        <p>Received Data: {mqttData["example/topic"]}</p>
      ) : (
        <p>No data received yet</p>
      )}
    </div>
  );
}

export default App;
