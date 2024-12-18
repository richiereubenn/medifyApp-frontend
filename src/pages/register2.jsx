import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import ProgressBar from '../components/progressbar';

const Register2 = () => {
    const [image, setImage] = useState(null);
    const [ocrData, setOcrData] = useState({});
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const startCamera = () => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                })
                .catch(err => {
                    console.error("Error accessing webcam: ", err);
                });
        };
        startCamera();
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const parseText = (text) => {
        console.log("OCR Text:", text); 
    
        const patterns = {
            nik: /NIK\s*:\s*(.+)/i,
            nama: /Nama\s*:\s*(.+)/i,
            tempatTanggalLahir: /.+Tgl.+:\s*(.+)/i,
            jenisKelamin: /Jenis\s*Kelamin\s*:\s*(.+)/i,
            alamat: /Alamat\s*:\s*(.+)/i,
            kelDesa: /.+Desa\s*:\s*(.+)/i,
            kecamatan: /Kecamatan\s*:\s*(.+)/i
        };
    
        const matches = {};
        Object.keys(patterns).forEach(key => {
            const match = text.match(patterns[key]);
            matches[key] = match ? match[1].trim() : '';
            console.log(`${key}:`, match ? match[1] : 'No match');
        });
    
        return matches;
    };      

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const photoData = canvas.toDataURL('image/png');
        setImage(photoData);
        processOCR(photoData);
    };

    const processOCR = (dataUrl) => {
        Tesseract.recognize(dataUrl, 'ind', {
            logger: (m) => console.log(m)
        }).then(({ data: { text } }) => {
            console.log("OCR Text:", text);
            const parsedData = parseText(text);
            console.log("Parsed Data:", parsedData); 
            setOcrData(parsedData);
            console.log("Updated ocrData:", parsedData); 
        });
    };  

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgUrl = reader.result;
                setImage(imgUrl);
                processOCR(imgUrl); 
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleNext = () => {
        console.log("Navigating with data:", ocrData);
        navigate('/registerform', { state: ocrData });
    };

    return (
        <div className="flex flex-col mx-1">
            <div className='flex flex-col h-[660px] justify-between'>
                <div className='flex flex-col'>
                    <p className="text-center text-xl font-semibold text-teal-600 mb-2">Registrasi</p>
                    <ProgressBar progress={50} />
                    <p className="text-lg text-start font-bold text-slate-800 mb-2">Foto KTP Untuk Mendaftar JKN KIS</p>
                    <div className='flex flex-col justify-center items-center'>
                        <video ref={videoRef} width="300" height="300" className="border text-center" />
                        <canvas ref={canvasRef} width="400" height="300" style={{ display: 'none' }} />
                        <button
                            onClick={capturePhoto}
                            className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-full w-12 h-12 flex items-center justify-center"
                        >
                        </button>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-4"
                    />
                    {image && (
                        <div className="flex mt-4 gap-3">
                            <h2 className="text-lg font-semibold">Preview :</h2>
                            <img src={image} alt="Captured" className="mt-2 border w-[180px]" width="400" />
                        </div>
                    )}
                </div>
                <div>
                    <button
                        onClick={handleNext}
                        className={`mt-4 w-full rounded border-2 border-teal-600 px-12 py-2 text-sm font-medium ${image ? 'bg-teal-600 text-white hover:bg-transparent hover:text-teal-600' : 'bg-gray-400 text-gray-600 cursor-not-allowed'} focus:outline-none focus:ring active:text-indigo-00`}
                        disabled={!image}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register2;


