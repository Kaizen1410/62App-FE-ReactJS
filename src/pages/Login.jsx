import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Tambahkan logika autentikasi di sini, misalnya mengirim permintaan ke backend
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-subtle">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Selamat Datang
          </h2>
          </div>
          <div>
          <form className="space-y-6" action="#" method="POST">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
              placeholder="Masukkan email Anda"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
              placeholder="Masukkan kata sandi Anda"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
          >
            Login
          </button>
        </form>
    </div>
    </div>
    </div>
  );
}

export default Login;
