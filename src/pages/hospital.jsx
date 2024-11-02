import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hospitalImage from '../assets/medify.png';

const HospitalPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const hospitals = [
        {
            name: 'RS Sejahtera',
            address: 'Jl. Merdeka No. 10, Surabaya',
            distance: '2 km',
            phone: '(031) 123-4567',
            image: hospitalImage,
            availableRooms: 5,
        },
        {
            name: 'RS Sentosa',
            address: 'Jl. Kebangsaan No. 15, Surabaya',
            distance: '5 km',
            phone: '(031) 234-5678',
            image: hospitalImage,
            availableRooms: 3,
        },
        {
            name: 'RS Harmoni',
            address: 'Jl. Perdamaian No. 20, Surabaya',
            distance: '7 km',
            phone: '(031) 345-6789',
            image: hospitalImage,
            availableRooms: 2,
        },
    ];

    // Filter hospitals based on the search term
    const filteredHospitals = hospitals.filter((hospital) =>
        Object.values(hospital).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Function to navigate to the doctor page with hospital name
    const navigateToDoctorPage = (hospitalName) => {
        navigate('/doctor', { state: { hospitalName } });
    };

    return (
        <div className="w-full">
            <p className="text-start text-xl font-semibold text-teal-600">List Rumah Sakit</p>
            <p className="text-sm text-start font-semibold text-slate-800 mt-[-2px] mb-3">Anggota : Richie</p>
            <input
                type="text"
                placeholder="Cari rumah sakit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            {filteredHospitals.map((hospital, index) => (
                <div key={index} className="flex bg-white rounded shadow-md p-4 mb-4">
                    <img
                        src={hospital.image}
                        alt="Hospital"
                        className="w-32 h-32 rounded object-cover"
                    />
                    <div className='flex flex-col justify-between w-full'>
                        <div className="ml-4 text-left">
                            <p className="font-bold text-lg text-teal-700">{hospital.name}</p>
                            <p className="text-sm text-gray-600">{hospital.address}</p>
                            <p className="text-sm text-gray-500">{hospital.distance}</p>
                            <p className="text-sm text-gray-500">{hospital.phone}</p>
                        </div>
                        <button
                            onClick={() => navigateToDoctorPage(hospital.name)}
                            className="mt-4 bg-teal-600 text-white rounded px-4 py-2 hover:bg-teal-700 transition duration-200"
                        >
                            Lihat Dokter
                        </button>
                    </div>
                </div>
            ))}
            {filteredHospitals.length === 0 && (
                <p className="text-gray-500 text-center mt-4">Rumah sakit tidak ditemukan</p>
            )}
        </div>
    );
};

export default HospitalPage;
