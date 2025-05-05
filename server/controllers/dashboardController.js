import Guest from '../models/Guest.js';
import RSVP from '../models/RSVP.js';

export const getDashboardStats = async (req, res) => {
  const totalGuests = await Guest.countDocuments();
  const rsvps = await RSVP.find();

  const accepted = rsvps.filter(r => r.status === 'Accepted').length;
  const declined = rsvps.filter(r => r.status === 'Declined').length;
  const pending = rsvps.filter(r => r.status === 'Pending').length;

  res.json({ totalGuests, accepted, declined, pending });
};
