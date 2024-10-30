import { Link } from "react-router-dom";
import medify1 from '../assets/medify1.png';

const LoginPage = () => {
    return (
        <>
            <div className="flex flex-col mt-[70px] mx-1 gap-8">
                <div className="flex justify-center">
                    <img src={medify1} alt="Deskripsi Gambar" className="w-52 mb-[-20px]" />
                </div>
                <p className="text-3xl font-bold text-teal-600">Login</p>
                <p className="mt-[-20px] text-slate-600 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in. Lorem ipsum dolor sit amet.</p>
                <div className="relative">
                    <input type="text" id="Nomor JKN" name="Nomor JKN"
                        className="bg-gray-200 peer w-full border-2 border-slate-400 py-1 px-3 text-base leading-8 text-slate-600 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-teal-600 focus:ring-2 focus:ring-teal-500"
                        placeholder="Nomor JKN" />
                    <label for="Nomor JKN"
                        className="absolute left-0 -top-6 text-sm leading-7 text-teal-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-teal-500">
                        Nomor JKN
                    </label>
                </div>
                <div className="relative">
                    <input type="text" id="password" name="password"
                        className="bg-gray-200 peer w-full border-2 border-slate-400 py-1 px-3 text-base leading-8 text-slate-600 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-teal-600 focus:ring-2 focus:ring-teal-500"
                        placeholder="password" />
                    <label for="password"
                        className="absolute left-0 -top-6 text-sm leading-7 text-teal-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-teal-500">
                        Password
                    </label>
                </div>

                <div class="w-full">
                    <button class="w-full mx-auto rounded border-2 border-teal-600 bg-teal-600 px-12 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-00">Button</button>
                    <p className="mt-2 text-slate-600">Belum punya akun? <span className="text-teal-600"><Link to="">Daftar Sekarang</Link></span></p>
                </div>
                
            </div>
        </>
    )
}

export default LoginPage