import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css"; // Assuming you're using Tailwind CSS

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const getAllPatients = () => {
    const url =
      "https://nexhealth.info/patients?subdomain=codeblooded-demo-practice&location_id=179498&new_patient=false&location_strict=false&sort=name&page=1&per_page=113";
    const options = {
      method: "GET",
      headers: {
        accept: "application/vnd.Nexhealth+json;version=2",
        Authorization: import.meta.env.VITE_API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setPatients(json.data.patients);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">All Patients</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient, index) => (
          <div
            key={index} onClick={()=>navigate(`/dashboard/patientrecord/${patient.id}`)}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-200 cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {patient.name} ( {patient.id} )
            </h2>
            <p className="text-gray-600">Email: {patient.email || "N/A"}</p>
            <p className="text-gray-600">Phone: {patient.bio.phone_number || "N/A"}</p>
            <p className="text-gray-600">
              Address: {patient.address || "Not Provided"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPatients;