import { Link, useNavigate } from "react-router-dom";
import mark from '../assets/mark.png';
import { useEffect, useState } from 'react';

const JanjiDokter = ({ userData, name }) => {
    return (
        <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-lg">
            <p className="text-lg font-bold text-teal-700 mb-4">Janji Bertemu Dokter</p>
            <div className="flex gap-4">
                <div className="flex flex-col gap-2 bg-teal-100 rounded-md p-4 w-2/3">
                    <p className="text-md font-semibold text-teal-800">{name.nama}</p>
                    <p className="text-sm text-teal-700">{userData.queueNumber || "Tanggal belum ditentukan"}</p>
                    <p className="text-sm text-teal-700">{userData.date || "Waktu belum ditentukan"}</p>
                    <p className="text-sm text-teal-700">{userData.rumahSakit || "RS belum ditentukan"}</p>
                </div>
                <div className="flex items-center bg-white p-4 rounded-md w-1/3">
                    <img src={mark} alt="Dokter" className="w-[50px] h-[50px] mr-4" />
                    <div>
                        <p className="text-md font-semibold text-teal-600">{userData.doctor}</p>
                        <p className="text-sm text-teal-500">{userData.specialization}</p>
                    </div>
                </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
                Untuk informasi lebih lanjut atau perubahan jadwal, gunakan 
                <button 
                    onClick={() => alert('Chatbot opened!')}
                    className="text-teal-500 font-semibold ml-1 underline hover:text-teal-700"
                >
                    chatbot
                </button> 
                kami.
            </p>
        </div>
    );
};

const RiwayatKesehatan = ({ userData }) => {
    return (
        <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-lg">
            <p className="text-md font-semibold text-slate-800 mb-2">Riwayat Kesehatan Terakhir</p>
            <div className="flex justify-between">
                <div className="text-start flex flex-col gap-2">
                    <p className="text-teal-700 font-semibold">{userData?.rumahSakit || "Loading..."}</p>
                    <p className="text-teal-700 font-semibold">Diagnosa</p>
                    <p className="text-teal-700 font-semibold">Keluhan</p>
                </div>
                <div className="text-end flex flex-col gap-2">
                    <p className="text-teal-700 font-semibold">{userData?.tanggal || "Loading..."}</p>
                    <p className="text-teal-700 font-semibold">{userData?.diagnosa || "Loading..."}</p>
                    <p className="text-teal-700 font-semibold">{userData?.gejala || "Loading..."}</p>
                </div>
            </div>
        </div>
    );
};

const TagihanIuran = ({ userData }) => {
    return (
        <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-lg">
            <p className="text-md font-semibold text-slate-800 mb-2">Tagihan Iuran</p>
            <div className="flex justify-between">
                <p className="text-md text-start font-semibold text-slate-800 mb-2">Total Tagihan :</p>
                <p>Rp. {userData?.tagihan?.toLocaleString('id-ID') || "Loading..."}</p>
            </div>
            <div className="flex justify-between rounded bg-teal-200 p-2 mt-2">
                <div className="text-start flex flex-col gap-2">
                    <p className="text-teal-700 font-semibold">Tagihan</p>
                    <p className="text-teal-700 font-semibold">Denda</p>
                </div>
                <div className="text-end flex flex-col gap-2">
                    <p className="text-teal-700 font-semibold">Rp. {userData?.tagihan?.toLocaleString('id-ID') || "Loading..."}</p>
                    <p className="text-teal-700 font-semibold">Rp. {userData?.denda?.toLocaleString('id-ID') || "Loading..."}</p>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const userId = parseInt(sessionStorage.getItem('userId'), 10);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        } else {
            const usersData = JSON.parse(localStorage.getItem('userData')) || [];
            const user = usersData.find(user => user.id === userId);
            setUserData(user);
        }
    }, [userId, navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('userId');
        navigate('/login');
    };

    const openChatbot = () => {
        navigate('/hospital');
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p className="text-sm">Hello,</p>
                        <p>{userId}</p>
                        <p className="font-semibold text-xl">{userData ? userData.nama : "Loading..."}</p>
                    </div>
                    <div>
                        <button
                            className="mt-2 w-full mx-auto rounded border-2 border-red-600 bg-red-600 px-8 py-1.5 text-sm font-medium text-white hover:bg-red-700 transition duration-200"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                {/* Render JanjiDokter only if there's appointment data */}
                {userData && userData.janjiBertemuDokter && Object.keys(userData.janjiBertemuDokter).length > 0 ? (
                    <JanjiDokter userData={userData.janjiBertemuDokter} name={userData} />
                ) : (
                    <div className="p-4 bg-white shadow-lg rounded-es-lg">
                        <p className="text-md text-start mb-[-1px] font-semibold text-slate-800 mb-2">Tidak ada janji dokter saat ini</p>
                        <p className="text-teal-700">Gunakan chatbot untuk memilih jadwal temu dokter</p>
                    </div>
                )}
                {userData && <RiwayatKesehatan userData={userData.riwayatKesehatanTerakhir} />}
                {userData && <TagihanIuran userData={userData.tagihanIuran} />}
            </div>

            <button
                className="fixed bottom-5 right-3 bg-teal-600 text-white rounded-full p-7 shadow-lg hover:bg-teal-700 transition duration-200"
                onClick={openChatbot}
            >
                Chatbot
            </button>
        </>
    );
}

export default HomePage;
