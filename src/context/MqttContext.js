// src/context/MqttContext.js
import React, { createContext, useState, useEffect } from "react";
import mqtt from "mqtt";

export const MqttContext = createContext();

export const MqttProvider = ({ children }) => {
    const [mqttData, setMqttData] = useState(null); // Store incoming MQTT data

    useEffect(() => {
        // Connect to MQTT broker
        const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt"); // Example broker URL
        console.log("Connecting to MQTT...");

        client.on("connect", () => {
            console.log("Connected to MQTT broker");
            // Subscribe to a topic
            client.subscribe("your/topic", (err) => {
                if (err) {
                    console.error("Subscription error:", err);
                } else {
                    console.log("Subscribed to topic");
                }
            });
        });

        client.on("message", (topic, message) => {
            console.log(`Received message: ${message.toString()}`);
            setMqttData(message.toString()); // Update state with received message
        });

        // Cleanup MQTT connection on component unmount
        return () => {
            client.end();
        };
    }, []);

    return (
        <MqttContext.Provider value={{ mqttData, setMqttData }}>
            {children}
        </MqttContext.Provider>
    );
};

