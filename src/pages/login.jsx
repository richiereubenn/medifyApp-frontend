import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import medify1 from '../assets/medify1.png';

const LoginPage = () => {
    const [jknNumber, setJknNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData && userData.jknNumber === jknNumber && userData.password === password) {
            alert('Login berhasil!');
            navigate('/');
        } else {
            alert('Nomor JKN atau password salah.');
        }
    };

    return (
        <div className="flex flex-col mt-[20px] mx-1 gap-8">
            <div className="flex justify-center">
                <img src={medify1} alt="Deskripsi Gambar" className="w-52 mb-[-20px]" />
            </div>
            <p className="text-3xl font-bold text-teal-600">Login</p>
            <p className="mt-[-20px] text-slate-600 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in. Lorem ipsum dolor sit amet.</p>
            <form onSubmit={handleLogin} className="flex flex-col gap-8">
                <div className="relative">
                    <input type="text" id="Nomor JKN" name="Nomor JKN"
                        className="bg-gray-200 peer w-full border-2 border-slate-400 py-1 px-3 text-base leading-8 text-slate-600 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-teal-600 focus:ring-2 focus:ring-teal-500"
                        placeholder="Nomor JKN"
                        value={jknNumber}
                        onChange={(e) => setJknNumber(e.target.value)}
                        required />
                    <label htmlFor="Nomor JKN"
                        className="absolute left-0 -top-6 text-sm leading-7 text-teal-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-teal-500">
                        Nomor JKN
                    </label>
                </div>
                <div className="relative">
                    <input type="password" id="password" name="password"
                        className="bg-gray-200 peer w-full border-2 border-slate-400 py-1 px-3 text-base leading-8 text-slate-600 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-teal-600 focus:ring-2 focus:ring-teal-500"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <label htmlFor="password"
                        className="absolute left-0 -top-6 text-sm leading-7 text-teal-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-teal-500">
                        Password
                    </label>
                </div>
                <div className="w-full">
                    <button className="w-full mx-auto rounded border-2 border-teal-600 bg-teal-600 px-12 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-00" type="submit">
                        Login
                    </button>
                    <div className="flex justify-center items-center text-sm mt-4">
                        <p>Belum memiliki akun?</p>
                        <Link to="/register1" className="text-teal-600 hover:underline ml-1">Daftar di sini</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
