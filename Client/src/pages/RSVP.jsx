import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const RSVP = () => {
  const [rsvps, setRsvps] = useState([]);

  const fetchRSVPs = async () => {
    const res = await api.get('/rsvp');
    setRsvps(res.data);
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  return (
    <div className="container mt-4">
      <h3>RSVP Responses</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Guest</th><th>Status</th><th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map((rsvp) => (
            <tr key={rsvp._id}>
              <td>{rsvp.guest.name}</td>
              <td>{rsvp.status}</td>
              <td>{rsvp.comment || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RSVP;
