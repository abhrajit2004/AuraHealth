const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appointmentdate : {
        type: String,
        required: true
    },
    appointmenttime : {
        type: String,
        required: true
    }
});

const Appointments = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointments;