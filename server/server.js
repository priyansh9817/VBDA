import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import morgan from 'morgan';

// Import Routes
import adminRoutes from './routes/adminRoutes.js';
import guestRoutes from './routes/guestRoutes.js';
import invitationRoutes from './routes/invitationRoutes.js';
import rsvpRoutes from './routes/rsvpRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();


// --- CORS Setup (VERY IMPORTANT to do before any routes or body-parsing) ---



// --- Body Parser Middleware ---
app.use(express.json());
app.use(morgan('dev')); // Logging middleware for development
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// --- Routes ---
app.use('/api/admin', adminRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/dashboard', dashboardRoutes);

// --- Default Route ---
app.get('/', (req, res) => {
  res.send('API is running');
});

// --- Server Listener ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
