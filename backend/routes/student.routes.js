const express = require('express');
const multer = require('multer');
const path = require('path');
const Student = require('../models/student.model');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage });

// Create a student
router.post('/', upload.single('img'), async (req, res) => {
    try {
        const studentData = req.body;
        if (req.file) {
            studentData.img = req.file.path;
        }
        const student = new Student(studentData);
        await student.save();
        res.status(201).json("Student Added Successfully");
    } catch (error) {
        res.status(400).json({ message: 'Error creating student', error });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error });
    }
});

// Get a single student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error });
    }
});

// Update a student
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: 'Error updating student', error });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
});

module.exports = router;
