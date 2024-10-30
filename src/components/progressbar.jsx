import React from 'react';

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-1 mb-4 dark:bg-slate-200">
            <div 
                className="bg-teal-600 h-1 rounded-full dark:bg-teal-500"
                style={{ width: `${progress}%` }} // Menggunakan prop untuk menentukan lebar
            ></div>
        </div>
    );
};

export default ProgressBar;