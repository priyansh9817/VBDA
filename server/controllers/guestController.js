import Guest from '../models/Guest.js';

export const addGuest = async (req, res) => {
  const { name, email, role } = req.body;
  const guest = await Guest.create({ name, email, role });
  res.status(201).json(guest);
};

export const getGuests = async (req, res) => {
  const guests = await Guest.find();
  res.json(guests);
};

export const updateGuest = async (req, res) => {
  const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(guest);
};

export const deleteGuest = async (req, res) => {
  await Guest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Guest removed' });
};
