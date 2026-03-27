import { useState } from 'react';
import api from '../services/api';
import useStore from '../store/store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useStore();

  const handleSubmit = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setUser(res.data);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input className="border p-2 w-full my-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full my-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white p-2 w-full mt-2" onClick={handleSubmit}>Login</button>
    </div>
  );
}