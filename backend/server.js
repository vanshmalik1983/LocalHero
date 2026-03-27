import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Socket.io basic setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});

app.get('/', (req, res) => res.send('LocalHero API running'));

server.listen(process.env.PORT || 5000, () => console.log('Server running...'));