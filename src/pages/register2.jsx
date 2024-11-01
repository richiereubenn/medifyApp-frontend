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
        console.log("OCR Text:", text); // Log OCR text to verify
      
        const nikMatch = text.match(/NIK\s*:\s*(\d{16})/i);
        const namaMatch = text.match(/Nama\s*:\s*(.+)/i);
        const ttlMatch = text.match(/Tempat\/Tgl Lahir\s*:\s*(.+)/i);
        const genderMatch = text.match(/Jenis Kelamin\s*:\s*(.+)/i);
        const alamatMatch = text.match(/Alamat\s*:\s*(.+)/i);
        const desaMatch = text.match(/Kel\/Desa\s*:\s*(.+)/i);
        const kecamatanMatch = text.match(/Kecamatan\s*:\s*(.+)/i);
      
        console.log("Matches:", {
          nikMatch,
          namaMatch,
          ttlMatch,
          genderMatch,
          alamatMatch,
          desaMatch,
          kecamatanMatch
        });
      
        return {
          nik: nikMatch ? nikMatch[1].trim() : '',
          nama: namaMatch ? namaMatch[1].trim() : '',
          tempatTanggalLahir: ttlMatch ? ttlMatch[1].trim() : '',
          jenisKelamin: genderMatch ? genderMatch[1].trim() : '',
          alamat: alamatMatch ? alamatMatch[1].trim() : '',
          kelDesa: desaMatch ? desaMatch[1].trim() : '',
          kecamatan: kecamatanMatch ? kecamatanMatch[1].trim() : ''
        };
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
        Tesseract.recognize(dataUrl, 'eng', {
            logger: (m) => console.log(m)
        }).then(({ data: { text } }) => {
            const parsedData = parseText(text);
            console.log("Parsed Data:", parsedData);
            setOcrData(parsedData);
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setImage(imgUrl);
            processOCR(imgUrl);
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