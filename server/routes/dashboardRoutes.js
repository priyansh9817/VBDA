import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/dashboard', protect, getDashboardStats);

export default router;