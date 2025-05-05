import express from 'express';
import { handleRSVP, getRSVPs } from '../controllers/rsvpController.js';
const router = express.Router();


router.post('/', handleRSVP);
router.get('/', getRSVPs);

export default router;