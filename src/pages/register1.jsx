import ProgressBar from "../components/progressbar";

const RegisterPage1 = () => {


    return (
        <>
            <div className="flex flex-col mx-1 h-[660px] justify-between">
                <div className="flex flex-col">
                    <p className="text-center text-xl font-semibold text-teal-600 mb-2">Registrasi</p>
                    <ProgressBar progress={0} />
                    <p className="text-lg text-start font-bold text-slate-800 mb-2">Data Registrasi</p>
                    <div className="flex flex-col gap-8 mt-6">
                        <div className="relative">
                            <input type="text" id="Nomor Telepon" name="Nomor Telepon"
                                className="bg-gray-200 peer w-full border-2 border-slate-400 py-1 px-3 text-base leading-8 text-slate-600 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-teal-600 focus:ring-2 focus:ring-teal-500"
                                placeholder="Nomor Telepon" />
                            <label for="Nomor Telepon"
                                className="absolute left-0 -top-6 text-sm leading-7 text-teal-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-teal-500">
                                Nomor Telepon
                            </label>
                        </div>
                        <div className="relative">
                            <input type="text" id="Password" name="Password"
                                className="bg-gray-200 peer w-full border-2 border-slate-400 py-1 px-3 text-base leading-8 text-slate-600 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-teal-600 focus:ring-2 focus:ring-teal-500"
                                placeholder="Password" />
                            <label for="Password"
                                className="absolute left-0 -top-6 text-sm leading-7 text-teal-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-teal-500">
                                Password
                            </label>
                        </div>
                        <div className="relative">
                            <input type="text" id="Konfirmasi Password" name="Konfirmasi Password"
                                className="bg-gray-200 peer w-full border-2 border-slate-400 py-1 px-3 text-base leading-8 text-slate-600 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-teal-600 focus:ring-2 focus:ring-teal-500"
                                placeholder="Konfirmasi Password" />
                            <label for="Konfirmasi Password"
                                className="absolute left-0 -top-6 text-sm leading-7 text-teal-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-teal-500">
                                Konfirmasi Password
                            </label>
                        </div>
                    </div>

                </div>

                <div class="w-full">
                    <button class="w-full mx-auto rounded border-2 border-teal-600 bg-teal-600 px-12 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-indigo-00">Button</button>
                </div>

            </div>
        </>
    );
};

export default RegisterPage1;
