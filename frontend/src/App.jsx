import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Locator from './pages/Locator.jsx';
import PatientRecord from './pages/PatientRecord.jsx';
import HealthRecords from './pages/HealthRecords.jsx';
import MedicalShop from './pages/MedicalShop.jsx';
import Appointments from './pages/Appointments.jsx';
import Rooms from './pages/Rooms.jsx';
import VideoCall from './pages/VideoCall.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {

  const [appointments, setAppointments] = useState([]);

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

  const joinRoom = (id) => {
    window.open(`/rooms/${id}`, "_blank");
  };


  useEffect(() => {
    getAppointments();
  }, [appointments]);


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/medicalshop" element={<MedicalShop />} />
        <Route path="/patientrecords/:id" element={<HealthRecords />} />
        <Route path="/rooms" element={<div className="min-h-screen bg-gray-100 p-6">
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
        </div>} />
        <Route path="/rooms/:id" element={<VideoCall />} />
        <Route
          path="/dashboard/*"
          element={
            <Layout>
              <Routes>
                {/* Dashboard items */}
                <Route path="" element={<Dashboard />} />
                <Route path="locator" element={<Locator />} />
                <Route path="appointments" element={<Appointments onClick={joinRoom} />} />
                <Route path="health-record" element={<PatientRecord />} />
              </Routes>
            </Layout>
          }
        />
        {/* for 404 or Landing Page or stuff that is outside dashboard */}
      </Routes>
    </>
  );
};

export default App;
