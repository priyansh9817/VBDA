import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Invitations = () => {
  const [guests, setGuests] = useState([]);
  const [eventName, setEventName] = useState('');
  const { auth } = useContext(AuthContext);

  const fetchGuests = async () => {
    const res = await api.get('/guests', {
      headers: { Authorization: `Bearer ${auth?.token}` },
    });
    setGuests(res.data);
  };

  const sendInvitation = async (guestId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/invitations/send`,
        { guestId, eventName },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      alert(`Invitation sent: ${res.data.message}`);
      fetchGuests();
    } catch (error) {
      console.error('Error sending invitation:', error);
      alert('Failed to send invitation. Please check your login session.');
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Send Invitations</h3>
      <input type="text" className="form-control mb-3" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Invited</th><th>Send</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => (
            <tr key={guest._id}>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.invited ? 'Yes' : 'No'}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => sendInvitation(guest._id)} disabled={guest.invited}>Send</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invitations;
