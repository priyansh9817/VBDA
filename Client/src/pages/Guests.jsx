import React, { useEffect, useState } from 'react';
import api from '../utils/api'; // ✅ your Axios instance

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', role: 'Guest' });

  const fetchGuests = async () => {
    try {
      const res = await api.get('/guests');
      setGuests(res.data);
    } catch (err) {
      console.error('Error fetching guests:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/guests', form); // ✅ using authenticated instance
      setForm({ name: '', email: '', role: 'Guest' });
      fetchGuests();
    } catch (err) {
      console.error('Error adding guest:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/guests/${id}`);
      fetchGuests();
    } catch (err) {
      console.error('Error deleting guest:', err);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Add Guest</h3>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            Add
          </button>
        </div>
      </form>

      <h4>Guest List</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest._id}>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.role}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(guest._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Guests;
