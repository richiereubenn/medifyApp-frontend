import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
const userId = sessionStorage.getItem('userId');
const BookDoctor = () => {
    const { doctorName } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const doctor = location.state?.doctor;
    const hospitalName = doctor?.hospital; 
const specialization = doctor?.specialization; 
    

    const [appointmentDetails, setAppointmentDetails] = useState({
        date: '',
        queueNumber: ''
    });
    const [isDateValid, setIsDateValid] = useState(false);

    useEffect(() => {
        if (!doctor) {
            alert("Doctor not found!");
            navigate('/doctors');
        }
    }, [doctor, navigate]);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setAppointmentDetails(prevDetails => ({
            ...prevDetails,
            date
        }));

        const selectedDate = new Date(date);
        const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const selectedDay = dayNames[selectedDate.getDay()];

        const isValid = doctor.schedule.some(slot => slot.day === selectedDay);

        setIsDateValid(isValid);
        if (isValid) {
            const queueNumber = Math.floor(Math.random() * 100) + 1;
            setAppointmentDetails(prevDetails => ({
                ...prevDetails,
                queueNumber
            }));
        } else {
            setAppointmentDetails(prevDetails => ({
                ...prevDetails,
                queueNumber: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isDateValid) {
            const appointmentData = {
                doctor: doctorName,
                date: appointmentDetails.date,
                queueNumber: appointmentDetails.queueNumber,
                rumahSakit: hospitalName,
                specialization: specialization

            };
    
            console.log("Retrieved userId from sessionStorage:", userId);
    
            if (userId) {
                const userId = sessionStorage.getItem('userId');
                const existingUsers = JSON.parse(localStorage.getItem('userData')) || [];
                const userIndex = existingUsers.findIndex(user => user.id == userId);

                console.log("Retrieved usersData from localStorage:", userIndex);
    
                if (userIndex > -1) {
                    existingUsers[userIndex] = {
                        ...existingUsers[userIndex],
                        janjiBertemuDokter: {...appointmentData}, 
                    };
    
                    localStorage.setItem('userData', JSON.stringify(existingUsers));
                    
                    alert(`Nomor antrian berhasil diambil.\nDokter: ${doctorName}\nTanggal: ${appointmentDetails.date}\nNomor Antrian: ${appointmentDetails.queueNumber}`);
                    navigate("/")
                } else {
                    alert('User not found in local storage.');
                }
            } else {
                alert('User ID not found in session storage.');
            }
        } else {
            alert('Please select a valid date.');
        }
    };
    
    
    
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Ambil Antrian</h2>
                <h3 className="text-xl font-semibold mb-1">Dokter: {doctorName}</h3>
                <h3 className="text-sm font-normal mb-1">Spesialisasi: {specialization}</h3>
                <h3 className="text-sm font-normal mb-4">Rumah Sakit: {hospitalName}</h3>
                <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Jadwal:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                        {doctor.schedule.map((slot, index) => (
                            <li key={index}>
                                {slot.day}: {slot.start} - {slot.end}
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Tanggal</label>
                        <input
                            type="date"
                            name="date"
                            value={appointmentDetails.date}
                            onChange={handleDateChange}
                            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:ring focus:border-teal-500"
                            required
                        />
                    </div>
                    {isDateValid && appointmentDetails.queueNumber && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nomor Antrian</label>
                            <input
                                type="text"
                                name="queueNumber"
                                value={appointmentDetails.queueNumber}
                                className="w-full px-3 py-2 border rounded-md text-gray-800"
                                readOnly
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className={`w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200 ${!isDateValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isDateValid}>
                        Konfirmasi
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookDoctor;
