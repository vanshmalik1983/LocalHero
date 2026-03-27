import { useState } from 'react';
import api from '../services/api';
import socket from '../socket';
import useStore from '../store/store';

export default function Booking({ provider }) {
  const { user } = useStore();
  const [service, setService] = useState(provider.services[0]);
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');

  const handleBooking = async () => {
    try {
      const res = await api.post('/bookings', {
        providerId: provider._id,
        service,
        category: provider.categories[0],
        dateTime,
        description
      });

      // Emit booking event
      socket.emit('booking-made', res.data);
      alert('Booking successful!');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Book {provider.services.join(', ')}</h2>
      <select value={service} onChange={e => setService(e.target.value)} className="border p-2 w-full mb-2">
        {provider.services.map(s => <option key={s}>{s}</option>)}
      </select>
      <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} className="border p-2 w-full mb-2"/>
      <textarea placeholder="Describe problem" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 w-full mb-2"/>
      <button onClick={handleBooking} className="bg-blue-500 text-white p-2 w-full">Book Now</button>
    </div>
  );
}