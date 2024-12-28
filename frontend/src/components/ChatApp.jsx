import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000",{
    transports: ["websocket", "polling"],
});

const ChatApp = ({ toggleChat }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message !== "") {
            const newMessage = {
                sender: "You",
                message: message,
                time: new Date().toLocaleTimeString(),
            };

            socket.emit("send-message", newMessage); // Emit the message to the server
            setMessages((prev) => [...prev, newMessage]); // Update the local message list
            setMessage(""); // Clear the input field
        }
    };

    useEffect(() => {

        socket.on('connect', () => {
            console.log("Connected to server via socket:", socket.id); // Log connection
        });
    

        socket.on("receive-message", (data) => {
            setMessages((prev) => [...prev, data]); // Add the received message to the list
        });

        return () => socket.off("receive-message");
    }, []);

    return (
        <div className="bg-gray-700 absolute right-0 w-[30vw] h-full z-10 flex flex-col justify-between overflow-y-auto">
            {/* Chat Header */}
            <div className="p-4 text-white bg-blue-800">
                <h1 className="text-lg font-bold">Chat Room</h1>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${
                            msg.sender === "You" ? "text-right" : "text-left"
                        }`}
                    >
                        <p className="text-sm text-gray-400">{msg.sender}</p>
                        <p className="bg-blue-700 text-white inline-block px-4 py-2 rounded-lg">
                            {msg.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-4 p-4 w-full">
                <button
                    onClick={toggleChat}
                    className="close-chat p-3 bg-blue-800 text-white transition rounded-lg shadow-md text-sm focus:outline-none hover:bg-blue-600 w-[5vw]"
                >
                    Leave
                </button>
                <input
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    className="p-3 flex-1 transition rounded-lg shadow-md text-sm focus:outline-none bg-gray-700 text-white"
                    placeholder="Write something..."
                />
                <button
                    onClick={sendMessage}
                    className="p-3 bg-blue-800 text-white transition rounded-lg shadow-md text-sm focus:outline-none hover:bg-blue-600 w-[5vw] disabled:bg-gray-500"
                    disabled={message.length < 1}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatApp;