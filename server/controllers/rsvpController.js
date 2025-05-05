import RSVP from '../models/RSVP.js';

export const handleRSVP = async (req, res) => {
  const { guestId, status, comment } = req.body;
  let rsvp = await RSVP.findOne({ guest: guestId });

  if (rsvp) {
    rsvp.status = status;
    rsvp.comment = comment;
    await rsvp.save();
  } else {
    rsvp = await RSVP.create({ guest: guestId, status, comment });
  }
  res.json(rsvp);
};

export const getRSVPs = async (req, res) => {
  const rsvps = await RSVP.find().populate('guest');
  res.json(rsvps);
};
