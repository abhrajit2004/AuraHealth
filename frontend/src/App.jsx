import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PatientRecord from './components/PatientRecord'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HealthRecords from './components/HealthRecords'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <div className='flex justify-center items-center min-h-screen flex-col gap-10'><span className='font-bold text-4xl'>Visit the following buttons</span><div className='buttons'><Link to={"/register"} className='bg-blue-700 text-white px-4 py-4 rounded-lg transition hover:bg-blue-600 w-[15vw] font-bold'>Register as patient</Link></div></div>
    },
    {
      path: '/register',
      element: <PatientRecord />  
    },
    {
      path: "/patientrecords/:id",
      element: <HealthRecords />
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
