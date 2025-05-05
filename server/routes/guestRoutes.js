import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addGuest, getGuests, updateGuest, deleteGuest } from '../controllers/guestController.js';
const router = express.Router();

router.route('/').post(protect, addGuest).get(protect, getGuests);
router.route('/:id').put(protect, updateGuest).delete(protect, deleteGuest);

export default router;