import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Locator from './pages/Locator.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import GoogleSigninPage from './pages/GoogleSigninPage.jsx';
import PatientRecord from './pages/PatientRecord.jsx';
import HealthRecords from './pages/HealthRecords.jsx';
import MedicalShop from './pages/MedicalShop.jsx';
import Rooms from './pages/Rooms.jsx';
import VideoCall from './pages/VideoCall.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AllPatients from './components/AllPatients.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {

  const [appointments, setAppointments] = useState([]);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkBackendConnection = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      if (response.ok) {
        setIsBackendConnected(true);
      }
    } catch (error) {
      toast.error('Failed to connect to the backend:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const getAppointments = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`${API_URL}/api/v1/appointments/getall`, requestOptions)
      .then((response) => response.json())
      .then((result) => setAppointments(result.appointments))
      .catch((error) => console.error(error));
  };

  const joinRoom = (id) => {
    window.open(`/dashboard/rooms/${id}`, "_blank");
  };


  useEffect(() => {
    if (isBackendConnected) {
      getAppointments();
    }
  }, [isBackendConnected]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <span className='loader2'></span>
      </div>
    );
  }

  if (!isBackendConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-red-500 text-xl font-semibold">There's a server issue so please check back later. Sorry for the inconvenience :(</div>
      </div>
    );
  }

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
        <Route path='/auth' element={<GoogleSigninPage />} />
        {/* <Route path="/rooms" element={<div className="min-h-screen bg-gray-100 p-6">
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
        </div>} /> */}
        <Route path="/dashboard/rooms/:id" element={<VideoCall />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  {/* Dashboard items */}
                  <Route path="" element={<Dashboard onClick={joinRoom} />} />
                  <Route path="locator" element={<Locator />} />
                  {/* <Route path="appointments" element={<Appointments onClick={joinRoom} />} /> */}
                  <Route path="health-record" element={<PatientRecord />} />
                  <Route path="medical-shop" element={<MedicalShop />} />
                  <Route path="patientrecord/:id" element={<HealthRecords />} />
                  <Route path="rooms" element={<div className="min-h-screen bg-gray-100 p-6">
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
                  <Route
                    path="patientrecords"
                    element={
                      <PrivateRoute allowedRoles={['doctor']}>
                        <AllPatients />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* for 404 or Landing Page or stuff that is outside dashboard */}
      </Routes>
    </>
  );
};

export default App;
