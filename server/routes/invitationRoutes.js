import express from 'express';
import { generateAndSendInvitation } from '../controllers/invitationController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/send', protect, generateAndSendInvitation);

export default router;