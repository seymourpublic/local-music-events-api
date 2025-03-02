const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();


const eventRoutes = require('./routes/eventRoutes');
const artistRoutes = require('./routes/artistRoutes');
const venueRoutes = require('./routes/venueRoutes');
const genreRoutes = require('./routes/genreRoutes');
const userRoutes = require('./routes/userRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
connectDB();

app.use(cors());// enable access from anywhere and using anything on this specific cors
app.use(bodyParser.json());

const onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
        onlineUsers.set(userId, socket.id);
        socket.join(userId);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
    });
});
app.set("io", io);
module.exports.io = io;
// Import routes
app.use('/api/events', eventRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => res.send('Local Music Events API Running'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

