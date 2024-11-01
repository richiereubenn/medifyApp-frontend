import { Link } from "react-router-dom";
import medify1 from '../assets/medify1.png';
import mark from '../assets/mark.png'
import john from '../assets/john.png'
import jane from '../assets/jane.png'
import { useState } from 'react';

const JanjiDokter = () => {
    return (
        <div className="w-full">
            <p className="text-md text-start font-semibold text-slate-800 mb-2">Janji Bertemu Dokter</p>
            <div className="flex w-full shadow-lg">
                <div className="text-start rounded-s-md text-sm bg-teal-200 p-4 w-full">
                    <p className="font-bold text-sm text-teal-700">Rafi Abhista Naya</p>
                    <p className="text-xs text-teal-800">Jumat, 18 Agustus 2024</p>
                    <p className="text-xs text-teal-800">18.00 WIB</p>
                    <p className="text-xs text-teal-800">RS Ciputra Surabaya</p>
                </div>
                <div className="flex rounded-e-md items-center bg-white text-start text-sm  p-4 gap-2 w-full">
                    <img src={mark} alt="Deskripsi Gambar" className="w-[50px] h-[50px]" />
                    <p className="text-sm font-bold text-teal-500">Dr Richard Rowan</p>
                </div>
            </div>
        </div>
    )
}

const RiwayatKesehatan = () => {
    const [selectedPatient, setSelectedPatient] = useState('Richie');

    const patientData = {
        Richie: {
            hospital: 'RS Ciputra Rahmawati',
            date: '27 Desember 2024',
            diagnosis: 'Sakit Jiwa',
            complaint: 'Tantrum',
        },
        Rafi: {
            hospital: 'RS Umum Sejahtera',
            date: '15 November 2024',
            diagnosis: 'Hipertensi',
            complaint: 'Sakit Kepala',
        },
    };

    const { hospital, date, diagnosis, complaint } = patientData[selectedPatient];

    return (
        <div className="w-full">
            <p className="text-md text-start font-semibold text-slate-800 mb-2">Riwayat Kesehatan Terakhir</p>
            
            <div className="flex w-full gap-3">
                {Object.keys(patientData).map((name) => (
                    <button
                        key={name}
                        onClick={() => setSelectedPatient(name)}
                        className={`px-3 py-1 rounded-sm font-semibold text-white ${selectedPatient === name ? 'bg-teal-700' : 'bg-gray-400'
                            }`}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <div className="bg-white p-4 mt-2 rounded-lg shadow-md">
                <div className="flex justify-between rounded">
                    <div className="text-start flex flex-col gap-2">
                        <p className="text-teal-700 font-semibold">{hospital}</p>
                        <p className="text-teal-700 font-semibold">Diagnosa</p>
                        <p className="text-teal-700 font-semibold">Keluhan</p>
                    </div>
                    <div className="text-end flex flex-col gap-2">
                        <p className="text-teal-700 font-semibold">{date}</p>
                        <p className="text-teal-700 font-semibold">{diagnosis}</p>
                        <p className="text-teal-700 font-semibold">{complaint}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TagihanIuran = () => {
    const dataTagihan = [
        {
            name: 'Rafi Abhista Naya',
            accountNumber: '09123131144',
            amount: 400000,
            penalty: 0,
        },
        {
            name: 'Richie Reuben Hermanto',
            accountNumber: '09223344556',
            amount: 200000,
            penalty: 50000,
        },
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

                {dataTagihan.map((individual, index) => (
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
                ))}
            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex">
                        <img src={mark} alt="Deskripsi Gambar" className="w-[40px]" />
                        <img src={john} alt="Deskripsi Gambar" className="w-[40px] ml-[-15px]" />
                        <img src={jane} alt="Deskripsi Gambar" className="w-[40px] ml-[-15px]" />
                    </div>
                    <div>
                        <button className="w-full mx-auto rounded border-2 border-teal-600 bg-teal-600 px-8 py-1.5 text-sm font-medium text-white ">Tambah Anggota</button>
                    </div>
                </div>
                <JanjiDokter />
                <RiwayatKesehatan />
                <TagihanIuran />
            </div>

            <button
                className="fixed bottom-5 right-3 bg-teal-600 text-white rounded-full p-7 shadow-lg hover:bg-teal-700 transition duration-200"
                onClick={() => alert('Chatbot opened!')}
            >
            </button>
        </>
    );
}

export default HomePage;
