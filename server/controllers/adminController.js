import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  const adminExists = await Admin.findOne({ email });
  if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

  const admin = await Admin.create({ email, password });
  res.status(201).json({ _id: admin._id, email: admin.email, token: generateToken(admin._id) });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    res.json({ _id: admin._id, email: admin.email, token: generateToken(admin._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};