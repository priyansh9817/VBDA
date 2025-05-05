import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Guest' },
  invited: { type: Boolean, default: false },
});

export default mongoose.model('Guest', guestSchema);