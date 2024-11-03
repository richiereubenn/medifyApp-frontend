import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './pages/login.jsx';
import RegisterPage1 from './pages/register1.jsx';
import RegisterPage2 from './pages/register2.jsx';
import RegisterForm from './pages/registerForm.jsx';
import HomePage from './pages/homepage.jsx';
import BaymaxPage from './pages/baymax.jsx';
import HospitalPage from './pages/hospital.jsx';
import DoctorPage from './pages/doctor.jsx';
import BookDoctorPage from './pages/bookdoctor.jsx';
import AddFamily from './pages/addFamily.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className='m-10'>
        <App />
        <Outlet />
      </div>
    ),
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register1', element: <RegisterPage1 /> },
      { path: 'register2', element: <RegisterPage2 /> },
      { path: '/', element: <HomePage /> },
      { path: '/registerform', element: <RegisterForm /> },
      { path: '/baymax', element: <BaymaxPage /> },
      { path: '/hospital', element: <HospitalPage /> },
      { path: '/doctor', element: <DoctorPage /> },
      { path: '/addFamily', element: <AddFamily /> },
      { path: '/book/:doctorName', element: <BookDoctorPage /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);