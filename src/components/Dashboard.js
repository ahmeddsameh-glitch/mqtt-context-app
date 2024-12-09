// src/components/Dashboard.js
import React, { useContext } from "react";
import { MqttContext } from "../context/MqttContext";

const Dashboard = () => {
    const { mqttData } = useContext(MqttContext);

    return (
        <div>
            <h2>Received Data</h2>
            <ul>
                {Object.entries(mqttData).map(([topic, message]) => (
                    <li key={topic}>
                        <strong>{topic}:</strong> {message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
