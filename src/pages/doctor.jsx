import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const doctorList = [
    {
        name: 'Dr. John Doe',
        specialization: 'Cardiologist',
        hospital: 'RS Sentosa',
        available: 'Available',
        schedule: [ 
            { day: 'Senin', start: '09:00', end: '17:00' }, 
            { day: 'Rabu', start: '09:00', end: '17:00' } 
        ]
    },
    {
        name: 'Dr. Jane Smith',
        specialization: 'Dermatologist',
        hospital: 'RS Elizabet',
        available: 'Not Available',
        schedule: [ 
            { day: 'Selasa', start: '10:00', end: '16:00' }, 
            { day: 'Kamis', start: '10:00', end: '16:00' } 
        ]
    },
    {
        name: 'Dr. Bob Brown',
        specialization: 'Neurologist',
        hospital: 'RS Tlogorejo',
        available: 'Available',
        schedule: [ 
            { day: 'Jumat', start: '10:00', end: '16:00' }, 
            { day: 'Sabtu', start: '10:00', end: '16:00' },
            { day: 'Minggu', start: '07:00', end: '11:00' }
        ]
    },
    {
        name: 'Dr. Alice Johnson',
        specialization: 'Pediatrician',
        hospital: 'RS Siloam',
        available: 'Available',
        schedule: [ 
            { day: 'Senin', start: '10:00', end: '16:00' }, 
            { day: 'Rabu', start: '08:00', end: '10:00' },
            { day: 'Kamis', start: '13:00', end: '16:00' }  
        ]
    },
    {
        name: 'Dr. Charlie Davis',
        specialization: 'Orthopedic Surgeon',
        hospital: 'RS Pantiwilasa Citarum',
        available: 'Not Available',
        schedule: [ 
            { day: 'Jumat', start: '14:00', end: '16:00' }, 
            { day: 'Sabtu', start: '14:00', end: '16:00' } 
        ]
    },
    {
        name: 'Dr. Emily White',
        specialization: 'Gastroenterologist',
        hospital: 'RS Citraland',
        available: 'Available',
        schedule: [ 
            { day: 'Selasa', start: '07:00', end: '17:00' }, 
        ]
    },
    {
        name: 'Dr. Frank Green',
        specialization: 'Ophthalmologist',
        hospital: 'RS Kariadi',
        available: 'Not Available',
        schedule: [ 
            { day: 'Rabu', start: '09:00', end: '12:00' }, 
            { day: 'Minggu', start: '17:00', end: '20:00' } 
        ]
    }
];

const Doctor = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleBooking = (doctor) => {
        navigate(`/book/${doctor.name}`, { state: { doctor } });
    };

    const filteredDoctors = doctorList.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <header className="text-teal-600 p-4">
                <h1 className="text-3xl font-bold text-center">Daftar Dokter</h1>
            </header>
            <main className="mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
                <input
                    type="text"
                    placeholder="Cari Dokter..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 mb-4 border rounded-md text-gray-800 focus:ring focus:border-teal-500"
                />
                {filteredDoctors.map((doctor, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-md bg-gray-100 shadow-sm relative flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-teal-700">{doctor.name}</h3>
                            <p className="text-gray-700"><strong>Spesialis:</strong> {doctor.specialization}</p>
                            <p className="text-gray-700"><strong>Rumah Sakit:</strong> {doctor.hospital}</p>
                            <p className={`text-gray-700 ${doctor.available === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                                <strong>Status:</strong> {doctor.available}
                            </p>
                            <div className="mt-2">
                                <h4 className="text-lg font-semibold mb-1">Jadwal:</h4>
                                <ul className="list-disc list-inside text-gray-700">
                                    {doctor.schedule.map((slot, index) => (
                                        <li key={index}>
                                            {slot.day}: {slot.start} - {slot.end}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={() => handleBooking(doctor)}
                            className="mt-[150px] px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200">
                            Pilih
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default Doctor;
