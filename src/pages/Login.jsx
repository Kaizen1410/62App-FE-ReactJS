import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../context/UserProvider';
import fetchClient from '../utils/fetchClient';
import { Button } from 'flowbite-react';
import { BeatLoader } from 'react-spinners';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { setUser } = UserState();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetchClient.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.data);
      navigate('/');
    } catch (err) {
      console.error(err.response);
      setMessage(err.response?.data.message || 'Cant send data to server');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-950">
      <div className="max-w-md w-full bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-cyan-950 dark:text-white text-center mb-6">
            Selamat Datang
          </h2>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-cyan-950 text-sm font-bold mb-2 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id='email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md py-2 px-3 bg-cyan-950 text-gray-50 dark:text-black dark:bg-white focus:outline-none focus:ring border-0 w-full"
                placeholder="Masukkan email Anda"
              />
            </div>
            <div className="mb-7">
              <label
                className="block text-cyan-950 text-sm font-bold mb-2 dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id='password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md py-2 px-3 bg-cyan-950 text-gray-50 dark:text-black dark:bg-white focus:outline-none focus:ring border-0 w-full"
                placeholder="Masukkan kata sandi Anda"
              />

            </div>

            <p className='mb-3 text-red-600 font-semibold'>{message}</p>

            {isLoading ? (
              <Button
                type="submit"
                className="w-full"
                disabled
              >
                <BeatLoader color="white" size={10} className='my-1' />
              </Button>) : (
              <Button
                type="submit"
                className="w-full"
              >
                Login
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
