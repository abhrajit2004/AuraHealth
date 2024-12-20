import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// demo_id 328248018, 328048057, 328276128, 328277506
// Nexhealth id 13062

const HealthRecords = () => {

    const { id } = useParams();

    const [patient, setPatient] = useState({});

    const viewPatient = () => {
        const url = `https://nexhealth.info/patients/${id}?subdomain=codeblooded-demo-practice`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/vnd.Nexhealth+json;version=2',
                Authorization: import.meta.env.VITE_API_KEY
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setPatient(json.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        viewPatient();
    }, [])


    return (
        <section className='bg-blue-200 p-10 min-h-screen'>
            <h1 className='font-medium text-4xl'>Your Record</h1>
            <div className='mt-8'>
                <div className='bg-white shadow-md rounded-lg p-6'>
                    <h2 className='text-2xl font-semibold mb-4'>Patient Details</h2>
                    <div className='grid grid-cols-2 gap-4 text-lg'>
                        <div>
                            <p className='font-medium'>Your Patient ID:</p>
                            <p id='patient-id' className='text-gray-700'>{id ? id : 'Loading...'} ( {patient && patient.bio ? patient.bio.gender : 'Loading...'} )</p>
                        </div>
                        <div>
                            <p className='font-medium'>Date of Birth:</p>
                            <p id='patient-age' className='text-gray-700'>{patient && patient.bio ? patient.bio.date_of_birth : 'Loading...'}</p>
                        </div>
                        <div>
                            <p className='font-medium'>First Name:</p>
                            <p id='patient-fname' className='text-gray-700'>{patient ? patient.first_name : 'Loading...'}</p>
                        </div>
                        <div>
                            <p className='font-medium'>Last Name:</p>
                            <p id='patient-lname' className='text-gray-700'>{patient ? patient.last_name : 'Loading...'}</p>
                        </div>
                        <div>
                            <p className='font-medium'>Weight:</p>
                            <p id='patient-weight' className='text-gray-700'>{patient && patient.bio ? patient.bio.weight : 'Loading...'} kg</p>
                        </div>
                        <div>
                            <p className='font-medium'>Height:</p>
                            <p id='patient-height' className='text-gray-700'>{patient && patient.bio ? patient.bio.height : 'Loading...'} cm</p>
                        </div>
                        <div>
                            <p className='font-medium'>Contact Number:</p>
                            <p id='patient-contact' className='text-gray-700'>{patient && patient.bio ? patient.bio.phone_number : 'Loading...'}</p>
                        </div>
                        <div>
                            <p className='font-medium'>Email:</p>
                            <p id='patient-email' className='text-gray-700'>{patient ? patient.email : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default HealthRecords