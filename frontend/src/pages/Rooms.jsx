import React from 'react'
import Modal from '../components/Modal';
import { useState } from 'react';

const Rooms = ({appointment, onClick}) => {

  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onClick={onClick} title="Join Call" appointment={appointment} />

      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blue-600">
            Appointment Details
          </h3>
          <span className="text-sm text-gray-500">{appointment.appointmentdate}</span>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Time:</span>{" "}
            {appointment.appointmenttime}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">For Patient:</span>{" "}
            {appointment.patientid}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Doctor:</span>{" "}
            {appointment.doctorname || "Not Assigned"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Location:</span>{" "}
            Aurahealth
          </p>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={() => setIsOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Join Call
          </button>
        </div>

      </div>
    </>
  )
}

export default Rooms;