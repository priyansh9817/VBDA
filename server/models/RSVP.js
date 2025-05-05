import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
  status: { type: String, enum: ['Accepted', 'Declined', 'Pending'], default: 'Pending' },
  comment: { type: String },
});

export default mongoose.model('RSVP', rsvpSchema);