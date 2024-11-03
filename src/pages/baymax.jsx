import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Medi from '../assets/medi.png';
import { useNavigate } from 'react-router-dom';

const BaymaxPage = () => {

    const navigate = useNavigate();

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser Anda tidak mendukung pengenalan suara.</span>;
    }

    const startListening = () => {
        SpeechRecognition.startListening({
            language: 'id-ID',
            continuous: true
        }).catch((error) => {
            alert('Microphone tidak dapat dideteksi. Pastikan izin mikrofon telah diberikan.');
        });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        resetTranscript();
        navigate('/screening-result')
    };

    return (
        <div className="lex flex-col items-center justify-start h-full">
            <div className="flex flex-col text-white p-8 rounded-lg items-start justify-start bg-teal-600"> 
                <h1 className="text-2xl font-bold mb-4">Halo, saya adalah Medi dan siap membantu Anda hari ini.</h1>
                <h1 className="text-lg font-normal">Apa keluhan yang sedang Anda rasakan?</h1>
            </div>
            <div className="relative flex flex-col items-center pt-24">
                <img
                    src={Medi}
                    alt="Medi"
                    className={`w-64 h-64 p-4 pt-8 rounded-full border-4 ${listening ? 'border-red-600' : 'border-blue-600'}`}
                />
                <p className="mt-4 p-4 border border-gray-300 rounded bg-white">{transcript}</p>
                <button
                    onClick={listening ? stopListening : startListening}
                    className={`mt-4 w-16 h-16 rounded-full flex items-center justify-center ${listening ? 'bg-red-600' : 'bg-green-600'} text-white text-2xl`}
                >
                    {listening ? '⏹️' : '🎙️'}
                </button>
            </div>
        </div>
    );
};

export default BaymaxPage;
