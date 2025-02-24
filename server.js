const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();


const eventRoutes = require('./routes/eventRoutes');
const artistRoutes = require('./routes/artistRoutes');
const venueRoutes = require('./routes/venueRoutes');
const genreRoutes = require('./routes/genreRoutes');

const app = express();
connectDB();

app.use(cors());// enable access from anywhere and using anything on this specific cors
app.use(bodyParser.json());

// Import routes
app.use('/api/events', eventRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/genres', genreRoutes);

app.get('/', (req, res) => res.send('Local Music Events API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
