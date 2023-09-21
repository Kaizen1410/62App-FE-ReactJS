import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../context/UserProvider';
import { Button, DarkThemeToggle, TextInput } from 'flowbite-react';
import { BeatLoader } from 'react-spinners';
import { login } from '../api/ApiAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState('');
  const { setUser } = UserState();
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error, token } = await login({ email, password });
    if(error) {
      console.error(error);
      setMessage(error);
    } else {
      localStorage.setItem('token', token);
      setUser(data);
      navigate('/');
    }
    setIsLoading(false);
  };

  const changeMode = () => {
    const dark = document.querySelector('html').classList.toggle('dark');
    if(dark) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <DarkThemeToggle className='absolute top-5 right-5' onClick={changeMode} />
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
              <TextInput
                id='email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
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

              <div className='relative'>
                <TextInput
                  id='password'
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  placeholder="Masukkan kata sandi Anda"
                />
                {showPw
                ? <i className="fa-solid fa-eye absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer dark:text-white" onClick={() => setShowPw(prev => !prev)}></i>
                : <i className="fa-solid fa-eye-slash absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer dark:text-white" onClick={() => setShowPw(prev => !prev)}></i>}
              </div>

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
