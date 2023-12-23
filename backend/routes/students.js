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
module.exports=router;