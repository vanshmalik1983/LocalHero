import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend Socket.io

socket.on("connect", () => {
  console.log("Connected to Socket.io:", socket.id);
});

export default socket;