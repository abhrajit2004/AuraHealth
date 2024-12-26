import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PatientRecord from './components/PatientRecord'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HealthRecords from './components/HealthRecords'
import { Link } from 'react-router-dom'
import MedicalShop from './components/MedicalShop'
import Appointments from './components/Appointments'
import Rooms from './components/Rooms'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import VideoCall from './components/VideoCall'
// import { useNavigate } from 'react-router-dom'


function App() {
  
  const [appointments, setAppointments] = useState([]);


  // const navigate = useNavigate();

  const getAppointments = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://localhost:3000/api/v1/appointments/all", requestOptions)
      .then((response) => response.json())
      .then((result) => setAppointments(result.appointments))
      .catch((error) => console.error(error));
  };

  // const handleCancel = (id) => {
  //   setAppointments(appointments.filter((appointment) => appointment.id !== id));
  //   alert("Appointment canceled!");
  // };

  // const handleReschedule = (id) => {
  //   alert(`Reschedule feature for appointment ID: ${id}`);
  // };
  const joinRoom = (id) => {
    window.open(`/rooms/${id}`, "_blank");
  };

  useEffect (() => {
    getAppointments();
  }, [appointments]);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <div className='flex justify-center items-center min-h-screen flex-col gap-10'><span className='font-bold text-4xl'>Visit the following buttons</span><div className='buttons'><Link to={"/register"} className='bg-blue-700 text-white px-4 py-4 rounded-lg transition hover:bg-blue-600 w-[15vw] font-bold'>Register as patient</Link><Link to={"/medicalshop"} className='bg-blue-700 text-white px-4 py-4 ml-4 rounded-lg transition hover:bg-blue-600 w-[15vw] font-bold'>Visit Medical Shop</Link></div></div>
    },
    {
      path: '/register',
      element: <PatientRecord />  
    },
    {
      path: '/medicalshop',
      element: <MedicalShop />  
    },
    {
      path: "/patientrecords/:id",
      element: <HealthRecords />
    },
    {
      path: "/appointments",
      element: <Appointments onClick={joinRoom} />
    },
    {
      path: '/rooms',
      element:    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Your Appointments
      </h1>
      <div className="max-w-3xl mx-auto">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center">No appointments booked.</p>
        ) : (
          appointments.map((appointment, index) => (
            <Rooms
              key={index}
              appointment={appointment}
              onClick={joinRoom}
            />
          ))
        )}
      </div>
    </div>
    },
    {
      path: "/rooms/:id",
      element: <VideoCall />
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
