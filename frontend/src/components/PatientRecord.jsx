import React, { useEffect } from 'react'
import { useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source URL
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const PatientRecord = () => {

    const [pdfFile, setPdfFile] = useState();
    const [symptoms, setSymptoms] = useState('');
    const [treatment, setTreatment] = useState('');

    const [isPrescription, setIsPrescription] = useState(false);

    const [formData, setFormData] = useState({ fname: '', lname: '', dob: '', email: '', contact: '', gender: 'Select Your Gender' });

    const [height, setHeight] = useState(0);

    const [weight, setWeight] = useState(0);

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const extractTextFromPDF = async () => {
        if (!pdfFile) {
            alert('Please upload a file');
            return;
        }

        try {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const pdfData = new Uint8Array(fileReader.result);
                const pdfDoc = await pdfjsLib.getDocument(pdfData).promise;
                let extractedText = '';

                // Loop through each page and extract text
                for (let i = 0; i < pdfDoc.numPages; i++) {
                    const page = await pdfDoc.getPage(i + 1);
                    const textContent = await page.getTextContent();
                    const textItems = textContent.items;

                    // Iterate through text items and extract the text
                    textItems.forEach(item => {
                        extractedText += item.str + ' ';  // Concatenate text from each item
                    });
                }
                // console.log(extractedText);
                setSymptoms(extractedText.split('Remarks')[1].split('.')[0]);
            };
            fileReader.readAsArrayBuffer(pdfFile);

        } catch (error) {
            console.error('Error extracting text:', error);
        }
    }


    const createPatient = (e) => {
        e.preventDefault();
        const url = 'https://nexhealth.info/patients?subdomain=codeblooded-demo-practice&location_id=179498';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/vnd.Nexhealth+json;version=2',
                'content-type': 'application/json',
                Authorization: import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify({
                provider: { provider_id: 12 },
                patient: {
                    bio: { date_of_birth: formData.dob, phone_number: formData.contact, gender: formData.gender, weight: weight, height: height },
                    first_name: formData.fname,
                    last_name: formData.lname,
                    email: formData.email
                }
            })
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                window.location.href = `/patientrecords/${json.data.user.id}`;
            })
            .catch(err => console.error(err));
    }

    const fetchTreatment = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "disease": symptoms
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/gettreatment", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTreatment(result.treatment);
            })
            .catch((error) => console.error(error));
    }


    return (
        <div className='bg-blue-200 p-10 min-h-screen'>
            <h1 className='font-medium text-3xl'>Register Yourself</h1>
            <div className="patientdetails bg-white min-w-[80vw] min-h-[80vh] rounded-lg mt-5 shadow-md">
                <section className="filters flex py-2 px-4 gap-3">
                    <div onClick={() => setIsPrescription(false)} className="details cursor-pointer transition-all">
                        Details
                    </div>
                    <div onClick={() => setIsPrescription(true)} className='prescription cursor-pointer transition-all'>
                        Get Treatment
                    </div>
                </section>
                {isPrescription === false ?
                    <form onSubmit={(e) => createPatient(e)} className='p-5 flex flex-col justify-center items-center gap-6 font-semibold'>
                        <div className="flex flex-col justify-center items-center">
                            <div className="fullname flex justify-center items-center gap-3">
                                <label htmlFor="fname" className="">First Name</label>
                                <input onChange={(e) => handleChange(e)} type="text" id="fname" name="fname" value={formData.first_name} className="p-2 border border-black rounded-lg mt-1" required />
                                <label htmlFor="lname" className="">Last Name</label>
                                <input onChange={(e) => handleChange(e)} type="text" id="lname" name="lname" value={formData.last_name} className="p-2 border border-black rounded-lg mt-1" required />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="dob" className="">Date of Birth</label>
                            <input onChange={(e) => handleChange(e)} type="date" id="dob" name="dob" value={formData.date_of_birth} className="p-2 border border-black rounded-lg mt-1 w-48" required />
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <label htmlFor="gender">Gender</label>
                            <select onChange={(e) => handleChange(e)} value={formData.gender} name="gender" id="gender" className='border border-black rounded-md w-[30vw] py-2' required>
                                <option disabled>Select Your Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Prefer not to say</option>
                            </select>
                        </div>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="weight" className="">Weight ( in kg )</label>
                            <input onChange={(e) => setWeight(e.target.value)} value={weight} type="number" id="weight" name="weight" className="p-2 w-[30vw] border border-black rounded-lg mt-1 " required />
                        </div>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="height" className="">Height ( in cm )</label>
                            <input onChange={(e) => setHeight(e.target.value)} value={height} type="number" id="height" name="height" className="p-2 w-[30vw] border border-black rounded-lg mt-1 " required />
                        </div>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="contact" className="">Contact Number</label>
                            <input onChange={(e) => handleChange(e)} value={formData.phone_number} type="text" id="contact" name="contact" className="p-2 w-[30vw] border border-black rounded-lg mt-1" required />
                        </div>
                        <div className="flex flex-col justify-center">
                            <label htmlFor="contact" className="">Email</label>
                            <input onChange={(e) => handleChange(e)} value={formData.email} type="email" id="email" name="email" className="p-2 w-[30vw] border border-black rounded-lg mt-1 " required />
                        </div>
                        <button type="submit" className='bg-blue-700 text-white px-4 py-2 rounded-lg transition hover:bg-blue-600 w-[10vw] font-bold'>Submit</button>
                    </form>
                    :
                    <div className='p-5 flex flex-col justify-center items-center gap-6 font-medium'>
                        <label htmlFor="pdf">Lab Report as PDF format</label>
                        <input type="file" onChange={handleFileChange} accept='application/pdf' className='border border-black rounded-md w-[30vw] py-2 px-2' name="pdf" id="pdf" required />
                        <button
                            onClick={() => extractTextFromPDF()}
                            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        >
                            Extract Symptoms
                        </button>
                        {symptoms && (
                            <div className="mt-4 flex justify-center items-center gap-4">
                                <h2 className="text-lg font-semibold">Extracted Symptoms</h2>
                                <p className="px-4 py-2 bg-gray-100 rounded text-xl">{symptoms}</p>
                                <button
                                    onClick={() => fetchTreatment()}
                                    className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                                >
                                    Get Treatment
                                </button>
                            </div>
                        )}

                        {treatment && (
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">Recommended Treatment:</h2>
                                <p className="p-2 bg-gray-100 rounded">{treatment}</p>
                            </div>
                        )}

                    </div>}
            </div>
        </div>
    )
}

export default PatientRecord
