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
    <div className="min-h-screen flex items-center justify-center bg-cyan-950">
      <div className="max-w-md w-full bg-cyan-400 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-cyan-950 text-center mb-6">
            Selamat Datang
          </h2>
          </div>
          <div>
          <form className="space-y-6" action="#" method="POST">
          <div className="mb-4">
            <label
              className="block text-cyan-950 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md py-2 px-3 bg-cyan-950 text-info focus:outline-none focus:ring border-0 w-full"
              placeholder="Masukkan email Anda"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-cyan-950 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md py-2 px-3 bg-cyan-950 focus:outline-none focus:ring border-0 w-full"
              placeholder="Masukkan kata sandi Anda"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-cyan-950 hover:bg-cyan-950 text-cyan-400 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring border-0 w-full"
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
