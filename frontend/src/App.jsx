import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import ProviderRegister from './pages/ProviderRegister';
import socket from './socket';
import useStore from './store/store';

function App() {
  const { user } = useStore();

  // Join Socket.io room for real-time notifications
  useEffect(() => {
    if (user) {
      socket.emit('join', user._id);
    }
  }, [user]);

  return (
    <div className="App">
      {/* Notification section can be added here or in Home.jsx */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider-register" element={<ProviderRegister />} />
        <Route path="/booking/:providerId" element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;