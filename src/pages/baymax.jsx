import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const BaymaxPage = () => {
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
        });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        resetTranscript(); 
    };

    return (
        <div className="flex flex-col items-center justify-center mt-72">
            <h1 className="text-xl font-bold mb-4">BayMax</h1>
            <div className="relative flex flex-col items-center">
                <div className={`w-32 h-32 rounded-full border-4 ${listening ? 'border-red-600' : 'border-blue-600'} flex items-center justify-center`}>
                    <span className={`text-4xl ${listening ? 'text-red-600' : 'text-blue-600'}`}>{listening ? '🎤' : '🤖'}</span>
                </div>
                <p className="mt-4 p-4 border border-gray-300 rounded bg-white">{transcript}</p>
            </div>
            <button
                onClick={listening ? stopListening : startListening}
                className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center ${listening ? 'bg-red-600' : 'bg-green-600'} text-white text-2xl`}
            >
                {listening ? '⏹️' : '🎙️'}
            </button>
        </div>
    );
};

export default BaymaxPage;
