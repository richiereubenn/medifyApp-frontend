import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login'
import RegisterPage2 from './pages/register2'
import RegisterPage1 from './pages/register1'
import HomePage from './pages/homepage'
import HospitalPage from './pages/hospital'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/register1",
    element: <RegisterPage1></RegisterPage1>
  },
  {
    path: "/register2",
    element: <RegisterPage2></RegisterPage2>
  },
  {
    path: "/hospital",
    element: <HospitalPage></HospitalPage>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
