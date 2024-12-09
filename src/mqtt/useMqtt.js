import { useContext, useEffect } from "react";
import mqtt from "mqtt";
import { MqttContext } from "../context/MqttContext";

const MQTT_BROKER_URL = "mqtt://test.mosquitto.org"; // Example broker
const TOPIC = "example/topic"; // Replaced with topic

const useMqtt = () => {
    const { setMqttData } = useContext(MqttContext);

    useEffect(() => {
        try {
            const client = mqtt.connect(MQTT_BROKER_URL);

            client.on("connect", () => {
                console.log("Connected to MQTT broker");
                try {
                    client.subscribe(TOPIC, (err) => {
                        if (err) {
                            console.error("Subscription error:", err);
                        }
                    });
                } catch (err) {
                    console.error("Error during subscription:", err);
                }
            });

            client.on("message", (topic, message) => {
                try {
                    console.log("Message received:", message.toString());
                    setMqttData((prevData) => ({
                        ...prevData,
                        [topic]: message.toString(),
                    }));
                } catch (err) {
                    console.error("Error processing message:", err);
                }
            });

            return () => {
                try {
                    client.end();
                } catch (err) {
                    console.error("Error closing MQTT client:", err);
                }
            };
        } catch (err) {
            console.error("Error setting up MQTT client:", err);
        }
    }, [setMqttData]);
};

export default useMqtt;
