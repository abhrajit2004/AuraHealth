const express = require('express')
const router = express.Router();
const Appointments = require('../models/Appointments');

router.post('/add', async (req, res) => {
    try {
        const appointment = req.body;
        const newAppointment = new Appointments(appointment);

        const existingAppointment = await Appointments.findOne({
            appointmentdate: appointment.appointmentdate, appointmenttime: appointment.appointmenttime});

        if (existingAppointment) {
            return res.status(400).json({message: "Appointment already exists!"});
        }
        const savedAppointment = await newAppointment.save();

        res.json({message: "Appointment created successfully!", savedAppointment});

    } catch (error) {
        res.status(500).json({message: "Internal Server Error!"});
    }
});

router.get('/all/:doctorname', async (req, res) => {
    try {
        const doctorname = req.params.doctorname;
        const appointments = await Appointments.find({doctorname: doctorname});
        res.json({appointments});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.get('/getall',async(req, res)=>{
    try {
        const appointments = await Appointments.find();
        res.json({appointments});
    } 
    catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
})

router.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedAppointment = await Appointments.findByIdAndDelete(id);
        if(!deletedAppointment){
            return res.status(404).json({message: "Appointment not found!"});
        }
        res.json({message: "Appointment deleted successfully!", deletedAppointment});
    }
    catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
});

module.exports = router;