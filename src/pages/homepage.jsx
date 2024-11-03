import { Link, useNavigate } from "react-router-dom";
import mark from '../assets/mark.png';
import { useEffect, useState } from 'react';

const JanjiDokter = ({ userData, name }) => {
    return (
        <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-lg">
            <p className="text-md font-semibold text-slate-800 mb-2">Janji Bertemu Dokter</p>
            <div className="flex gap-4 bg-teal-100 rounded">
                <div className="flex flex-col gap-2 rounded-md p-3 w-1/2">

                    <p className="text-sm text-teal-700">{userData.rumahSakit || "RS belum ditentukan"}</p>
                    <p className="text-sm text-teal-700">{userData.date || "Waktu belum ditentukan"}</p>

                    <p className="text-sm text-teal-700">Nomor Antrian : {userData.queueNumber || "Tanggal belum ditentukan"}</p>
                </div>
                <div className="flex items-center  p-4 rounded-md w-1/2 gap-4">
                    <img src={mark} alt="Deskripsi Gambar" className="w-[50px] h-[50px]" />
                    <div>

                        <p className="text-md font-bold text-teal-600">{userData.doctor}</p>
                        <p className="text-sm text-teal-500">Spesialis: {userData.specialization}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RiwayatKesehatan = ({ userData }) => {
    const navigate = useNavigate();
    const user = userData;
    const [selectedPatient, setSelectedPatient] = useState(user.nama);

    const patientData = {
        [user.nama]: {
            hospital: user.riwayatKesehatanTerakhir.rumahSakit,
            date: user.riwayatKesehatanTerakhir.tanggal,
            diagnosis: user.riwayatKesehatanTerakhir.diagnosa,
            complaint: user.riwayatKesehatanTerakhir.gejala,
        },
        ...(user.family && user.family.length > 0 ? user.family.reduce((acc, familyMember) => {
            acc[familyMember.nama] = {
                hospital: familyMember.riwayatKesehatanTerakhir.rumahSakit,
                date: familyMember.riwayatKesehatanTerakhir.tanggal,
                diagnosis: familyMember.riwayatKesehatanTerakhir.diagnosa,
                complaint: familyMember.riwayatKesehatanTerakhir.gejala,
            };
            return acc;
        }, {}) : {}),
    };

    const { hospital, date, diagnosis, complaint } = patientData[selectedPatient] || {};
    const addFamily = () => {
        navigate('/addFamily');
    };
    return (
        <div className="w-full mt-4">
            <div className="flex justify-between items-center">
                <p className="text-md text-start font-semibold text-slate-800 mb-2">Riwayat Kesehatan Terakhir</p> 
                <button
                    className=" items-end mx-auto rounded border-2 border-teal-600 bg-teal-600 px-4 py-1 text-sm font-medium text-white hover:border-teal-900 hover:bg-teal-900 transition duration-200"
                    onClick={addFamily}
                >
                    Add Family
                </button>
            </div>


            <div className="flex w-full gap-3 mt-4">
                {Object.keys(patientData).map((name) => (
                    <button
                        key={name}
                        onClick={() => setSelectedPatient(name)}
                        className={`px-3 py-1 rounded-sm font-semibold text-white ${selectedPatient === name ? 'bg-teal-700' : 'bg-gray-400'}`}
                    >
                        {name}
                    </button>
                ))}

            </div>

            <div className="bg-white p-4 mt-2 rounded-lg shadow-md">
                <div className="flex justify-between rounded">
                    <div className="text-start flex flex-col gap-2">
                        <p className="text-teal-700 font-semibold">{hospital || "Tidak ada data rumah sakit"}</p>
                        <p className="text-teal-700 font-semibold">Diagnosa</p>
                        <p className="text-teal-700 font-semibold">Keluhan</p>
                    </div>
                    <div className="text-end flex flex-col gap-2">
                        <p className="text-teal-700 font-semibold">{date || "Tidak ada tanggal"}</p>
                        <p className="text-teal-700 font-semibold">{diagnosis || "Tidak ada diagnosa"}</p>
                        <p className="text-teal-700 font-semibold">{complaint || "Tidak ada keluhan"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



const TagihanIuran = ({ userData }) => {
    const user = userData;

    const dataTagihan = [
        {
            name: user.nama,
            accountNumber: user.jkn,
            amount: user.tagihanIuran.tagihan,
            penalty: user.tagihanIuran.denda,
        },
        ...(user.family && user.family.length > 0 ? user.family.map(familyMember => ({
            name: familyMember.nama,
            accountNumber: familyMember.jkn,
            amount: familyMember.tagihanIuran.tagihan,
            penalty: familyMember.tagihanIuran.denda,
        })) : [])
    ];

    const totalTagihan = dataTagihan.reduce((total, individual) => total + individual.amount + individual.penalty, 0);

    return (
        <div className="w-full">
            <p className="text-md text-start font-semibold text-slate-800 mb-2">Tagihan Iuran</p>
            <div className="bg-white p-4 mt-2 rounded-lg shadow-md">
                <div className="flex justify-between">
                    <p className="text-md text-start font-semibold text-slate-800 mb-2">Total Tagihan :</p>
                    <p>Rp. {totalTagihan.toLocaleString('id-ID')}</p>
                </div>
                {dataTagihan.length > 0 ? (
                    dataTagihan.map((individual, index) => (
                        <div key={index} className="flex justify-between rounded bg-teal-200 p-2 mt-2">
                            <div className="text-start flex flex-col gap-2">
                                <p className="text-teal-700 font-semibold">{individual.name}</p>
                                <p className="text-teal-700 font-semibold">Tagihan</p>
                                <p className="text-teal-700 font-semibold">Denda</p>
                            </div>
                            <div className="text-end flex flex-col gap-2">
                                <p className="text-teal-700 font-semibold">{individual.accountNumber}</p>
                                <p className="text-teal-700 font-semibold">Rp. {individual.amount.toLocaleString('id-ID')}</p>
                                <p className="text-teal-700 font-semibold">Rp. {individual.penalty.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-teal-700">Tidak ada tagihan untuk pengguna ini.</p>
                )}
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
        navigate('/baymax');
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p className="text-md">Hello,</p>
                        <p className="font-semibold text-2xl">{userData ? userData.nama : "Loading..."}</p>
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
                {userData && userData.janjiBertemuDokter && Object.keys(userData.janjiBertemuDokter).length > 0 ? (
                    <JanjiDokter userData={userData.janjiBertemuDokter} name={userData} />
                ) : (
                    <div className="p-4 bg-white shadow-lg rounded-es-lg">
                        <p className="text-md text-start font-semibold text-slate-800 mb-2">Tidak ada janji dokter saat ini</p>
                        <p className="text-teal-700">Gunakan chatbot untuk memilih jadwal temu dokter</p>
                    </div>
                )}
                {userData && <RiwayatKesehatan userData={userData} />}
                {userData && <TagihanIuran userData={userData} />}
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
