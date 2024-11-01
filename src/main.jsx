import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './pages/login';
import RegisterPage1 from './pages/register1';
import RegisterPage2 from './pages/register2';
import RegisterForm from './pages/registerForm.jsx';
import HomePage from './pages/homepage';
import BaymaxPage from './pages/baymax';

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
      { path: '/baymax', element: <BaymaxPage/> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);