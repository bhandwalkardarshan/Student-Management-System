const mongoose = require('mongoose');

const qualificationEnum = ['BCA', 'BCom', 'BE'];

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    qualification: { type: String, enum: qualificationEnum, required: true },
    img: { type: String, required: false }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
