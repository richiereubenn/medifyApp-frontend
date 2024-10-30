import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const FullWidthButton = () => {
  return (
    <button className="w-auto h-12 px-4 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-200">
      Click Me
    </button>
  );
};

const App = () => {
  return (
    <div className="flex flex-col gap-2 justify-center m-[-10] bg-slate-300">
      <FullWidthButton />
      <FullWidthButton />
      <FullWidthButton />
      <FullWidthButton />
    </div>
  );
};

export default App
