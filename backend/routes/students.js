const express=require('express');
const mongoose=require('mongoose');
const Students = require('../models/student');
const router=express.Router();
//const Students = mongoose.model('students',StudentSchema);

const { body, validationResult } = require('express-validator');
const { response } = require('express');

router.post("/addStudent", [
    body("email", "Please enter a valid email").isEmail(),
    body("name", "Please enter a valid password").exists(),

], async (req, res) => {

    console.log("data --> ",req.body);
    console.log("adding student");
    let success = false;	
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let student = await Students.findOne({ email: req.body.email });
    // if it finds the email , 400 status will be displayed
    if (student) {
        return res.status(400).json({ success, error: "Sorry, A user with this email exists" });
    }

    const {name,email,rollnumber,subject,interest,city,gender,dob,degree,department,startdate,enddate} = req.body;


    student = Students.create({
        name: name,
        email: email,
        rollnumber: rollnumber,
        gender:gender,
        dateOfBirth:new Date(dob),
        city:city,
        interest: interest,
        department:department,
        degree:degree,
        subject: subject,
        startdate:new Date(startdate),
        endDate:new Date(enddate),    
    });

    success=true;

    res.json({email,success});


});

router.get("/getAllInterests", async (req, res) => {
    let success=false;
    try {
        // Fetch only the 'interest' field for all students
        const interests = await Students.find({}, 'interest');
        success=true;
        res.json({ success,interests });
    } catch (error) {
        console.error('Error fetching interests:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


router.get("/getAllStudents", async (req, res) => {
    let success = false;
    try {
        // Fetch all students
        console.log("getting all students")
        const students = await Students.find({});
        success = true;
        res.json({ success, students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.delete("/deleteStudent/:email", async (req, res) => {
    const emailToDelete = req.params.email;

    try {
        // Find the student by email and delete it
        const result = await Students.findOneAndDelete({ email: emailToDelete });

        if (result) {
            res.json({ success: true, message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ success: false, error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


router.put("/updateStudent/:email", async (req, res) => {
    const emailToUpdate = req.params.email;
    const updatedStudentData = req.body; // Assuming the updated data is sent in the request body
    console.log(updatedStudentData);
    try {
        // Find the student by email and update it
        const result = await Students.findOneAndUpdate({ email: emailToUpdate }, updatedStudentData, { new: true });

        if (result) {
            res.json({ success: true, message: 'Student updated successfully', updatedStudent: result });
        } else {
            res.status(404).json({ success: false, error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

module.exports=router;