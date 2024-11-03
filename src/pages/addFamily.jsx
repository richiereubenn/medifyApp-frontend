import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const userId = sessionStorage.getItem('userId');

const dummyFamilyData = [
    {
        "nama": "Rafi Abhista",
        "jkn": "JKN-787122",
        "nik": "123",
        "alamat": "Citraland",
        "riwayatKesehatanTerakhir": {
            "rumahSakit": "Rumah Sakit Umum",
            "tanggal": "2024-10-01",
            "diagnosa": "Hipertensi",
            "gejala": "Pusing"
        },
        "tagihanIuran": {
            "tagihan": 50000,
            "denda": 5000,
            "totalTagihan": 55000
        }
    },
    {
        "nama": "Budi Santoso",
        "jkn": "JKN-123456",
        "nik": "124",
        "alamat": "Jl. Merdeka No.1",
        "riwayatKesehatanTerakhir": {
            "rumahSakit": "RS Khusus",
            "tanggal": "2024-09-15",
            "diagnosa": "Flu",
            "gejala": "Demam"
        },
        "tagihanIuran": {
            "tagihan": 40000,
            "denda": 2000,
            "totalTagihan": 42000
        }
    },
    {
        "nama": "Siti Aminah",
        "jkn": "JKN-654321",
        "nik": "125",
        "alamat": "Komplek Citra Indah",
        "riwayatKesehatanTerakhir": {
            "rumahSakit": "RS Bersalin",
            "tanggal": "2024-08-20",
            "diagnosa": "Mual",
            "gejala": "Muntah"
        },
        "tagihanIuran": {
            "tagihan": 60000,
            "denda": 5000,
            "totalTagihan": 65000
        }
    },
    {
        "nama": "Ahmad Sulaiman",
        "jkn": "JKN-987654",
        "nik": "126",
        "alamat": "Jl. Raya No.5",
        "riwayatKesehatanTerakhir": {
            "rumahSakit": "RS Harapan",
            "tanggal": "2024-07-30",
            "diagnosa": "Diabetes",
            "gejala": "Haus terus"
        },
        "tagihanIuran": {
            "tagihan": 55000,
            "denda": 3000,
            "totalTagihan": 58000
        }
    },
    {
        "nama": "Lina Marlina",
        "jkn": "JKN-111222",
        "nik": "127",
        "alamat": "Jl. Kebangsaan",
        "riwayatKesehatanTerakhir": {
            "rumahSakit": "RS Umum Daerah",
            "tanggal": "2024-06-10",
            "diagnosa": "Asma",
            "gejala": "Sesak napas"
        },
        "tagihanIuran": {
            "tagihan": 70000,
            "denda": 6000,
            "totalTagihan": 76000
        }
    },
];

const AddFamily = () => {
    const [searchJKN, setSearchJKN] = useState('');
    const [selectedFamily, setSelectedFamily] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false); 
    const navigate = useNavigate();
    const handleSearch = () => {
        const foundFamily = dummyFamilyData.find(familyMember => familyMember.jkn === searchJKN);
        setSelectedFamily(foundFamily || null);
        setSearchPerformed(true); 
    };

    const handleSubmit = () => {
        if (selectedFamily) {
            const userId = sessionStorage.getItem('userId');
    
            if (userId) {
                const existingUsers = JSON.parse(localStorage.getItem('userData')) || [];
                const userIndex = existingUsers.findIndex(user => user.id == userId);
    
                if (userIndex > -1) {
                    const existingFamily = existingUsers[userIndex].family || [];
                    
                    existingFamily.push(selectedFamily);
    
                    existingUsers[userIndex] = {
                        ...existingUsers[userIndex],
                        family: existingFamily,
                    };
    
                    localStorage.setItem('userData', JSON.stringify(existingUsers));
    
                    alert(`Anggota keluarga berhasil ditambahkan: ${selectedFamily.nama}`);
       
                    setSearchJKN('');
                    setSelectedFamily(null);
                    setSearchPerformed(false); 
                    navigate('/');
                } else {
                    alert('User not found in local storage.');
                }
            } else {
                alert('User ID not found in session storage.');
            }
        }
    };
    
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-teal-500">Add Family Member</h2>
            <input
                type="text"
                value={searchJKN}
                onChange={(e) => setSearchJKN(e.target.value)}
                placeholder="Enter JKN number"
                className="border p-2 mb-2 w-full"
            />
            <button 
                onClick={handleSearch} 
                className="bg-blue-500 text-white px-4 py-2 mb-4 w-full"
            >
                Search
            </button>

            {selectedFamily ? (
                <div className="mb-4">
                    <h3 className="font-semibold">Family Member Details:</h3>
                    <p>Name: {selectedFamily.nama}</p>
                    <p>NIK: {selectedFamily.nik}</p>
                    <p>Address: {selectedFamily.alamat}</p>
                </div>
            ) : (
                searchPerformed && <p className="text-red-500">No family member found with that JKN number.</p>
            )}

            <button 
                onClick={handleSubmit} 
                className={`bg-teal-500 text-white px-4 py-2 w-full ${!selectedFamily ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={!selectedFamily}
            >
                Add Family
            </button>
        </div>
    );
};

export default AddFamily;