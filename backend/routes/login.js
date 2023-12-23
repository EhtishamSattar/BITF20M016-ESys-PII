const express=require('express');
const mongoose=require('mongoose');
//const Admins = require('../models/Admins');
const router=express.Router();
const Admins = mongoose.model('admins');

const { body, validationResult } = require('express-validator');
const { response } = require('express');

router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cant be blank').exists(),
],async (req,res)=>{

    console.log("receiving request");
    let success=false;
    let errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    try 
    {
        const {email,password}=req.body;
        console.log("email",email,"password",password)
        const admin=await Admins.findOne({email});
        console.log("Found admin",admin.email);
        if(!admin)
        {
            success=false;
            return res.status(400).json({success,error:'Invalid Email'});
        }

        success=true;
        return res.json({success,email});

    }catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

})

// router.post("/signUp", [
//     body("email", "Please enter a valid email").isEmail(),
//     body("password", "Please enter a valid password").exists(),

// ], async (req, res) => {

//     console.log("in sign up authentication");
//     let success = false;	
//     let errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     let user = await Admins.findOne({ email: req.body.email });
//     // if it finds the email , 400 status will be displayed
//     if (user) {
//         return res.status(400).json({ success, error: "Sorry, A user with this email exists" });
//     }

//     const { email, password } = req.body;


//     user = Admins.create({
//         email: email,
//         password: password,
//     });

//     success=true;

//     res.json({email,success});


// });
module.exports=router;