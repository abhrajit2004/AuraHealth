import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar styles

const Appointments = ({ appointment, onClick }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");


  const handleJoin = (id) => {
    onClick(id);
  }

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) return alert("Select date and time!");
    const formattedDate = selectedDate.toLocaleDateString();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "appointmentdate": formattedDate,
      "appointmenttime": selectedTime
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/api/v1/appointments/add", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

    setSelectedDate(null);
    setSelectedTime("");
    // alert("Appointment booked successfully!");
  };

  const handleCancelAppointment = (id) => {
    const raw = "";

    const requestOptions = {
      method: "DELETE",
      body: raw,
      redirect: "follow"
    };

    fetch(`http://localhost:3000/api/v1/appointments/delete/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const getAppointments = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://localhost:3000/api/v1/appointments/all", requestOptions)
      .then((response) => response.json())
      .then((result) => { setAppointments(result.appointments) })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAppointments();
  }, [appointments]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">


      {/* Booking Section */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Schedule your Appointment
        </h1>
        <h2 className="text-xl font-semibold mb-4">Create Appointment</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Date:</label>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()} // Disable past dates
            className="border border-gray-300 rounded shadow"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Time:</label>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select a time</option>
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          onClick={handleBookAppointment}
        >
          Create Appointment
        </button>
      </div>

      {/* Appointments Section */}
      <div className="mx-auto bg-white shadow-lg rounded-lg p-6 min-w-[30vw]">
        <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments created yet.</p>
        ) : (
          <ul>
            {appointments.map((appointment, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  {appointment.appointmentdate} at {appointment.appointmenttime}
                </span>
                <div className="buttons flex gap-4 justify-center items-center">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition font-bold"
                    onClick={()=>handleJoin(appointment._id)}
                  >
                    Join Room
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition font-bold"
                    onClick={() => handleCancelAppointment(appointment._id)}
                  >
                    Cancel
                  </button>
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Appointments;