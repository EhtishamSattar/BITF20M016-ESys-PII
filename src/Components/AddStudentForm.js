// import React, { useState } from 'react'

// const AddStudentForm = () => {
//     const [interest, setInterest]=useState('')

//     const onChange = (e) => {
//         setInterest({ ...interest, [e.target.name]: e.target.value });
//         //console.log(credentials.password,"  ",credentials.cpassword);
//         //setInterest(e.target.value)
//         console.log(interest);
//         sessionStorage.setItem('interest',interest) 
//     }


//     return (

//         <>


//             {/* <label for="browser">Choose a browser:</label>
//             <select id="browser" name="browser" style={{ "border": "1px solid #ccc", "padding": "5px", "border-radius": "4px" }}>
//                 <option value="chrome">Chrome</option>
//                 <option value="firefox">Firefox</option>
//                 <option value="ie">Internet Explorer</option>
//                 <option value="opera">Opera</option>
//                 <option value="safari">Safari</option>
//                 <option value="edge">Microsoft Edge</option>
//             </select> */}


//             <div className='mt-20'>
//             <label for="browser">Choose or type a browser:</label>
//             <input onChange={onChange} value={interest} list="browsers" id="browser" name="interest" style={{ "border": "1px solid #ccc", "padding": "5px", "border-radius": "4px" }} />
//             <datalist id="browsers">
//                 <option value="Chrome" />
//                 <option value="Firefox" />
//                 <option value="Internet Explorer" />
//                 <option value="Opera" />
//                 <option value="Safari" />
//                 <option value="Microsoft Edge" />
//             </datalist>
//             </div>


//         </>
//     )
// }

// export default AddStudentForm


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = () => {
    let navigate = useNavigate();
    const [interest, setInterest] = useState([]);
    const [credentials, setcredentials] = useState({ name: "", email: "", rollnumber: "", subject: "", interest: "", city: "", gender: "", dob: "", degree: "", department: "", startdate: "", enddate: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted with data ", credentials);
        const { name, email, rollnumber, subject, interest, city, gender, dob, degree, department, startdate, enddate } = credentials;
        const response = await fetch("http://localhost:5000/api/student/addStudent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, rollnumber, subject, interest, city, gender, dob, degree, department, startdate, enddate }),
        });

        const json = await response.json();
        //console.log(credentials.password," ",credentials.cpassword);
        // console.log(json.success,json.authToken);
        if (json.success) {
            //to redirect we are using useNavigate or useHistory hook from react router dom
            navigate("/studentlist");
            alert("Student Added Successfully :) ");

        } else {
            console.log(json);
            alert(json.error);

        }
    }

    const onChange = (e) => {
        // Update the state directly with the input value
        ///setcredentials(e.target.value);
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
        console.log('Selected interest:', credentials.interest);
        // If you want to store the interest in sessionStorage, you can do it here
        sessionStorage.setItem('interest', credentials.interest);
    };

    const getInterests = async (e) => {

        const response = await fetch("http://localhost:5000/api/student/getAllInterests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        console.log("----" + json.success)

        if (json.success) {
            setInterest(json.interests);
        
            console.log("interests from database", interest);

        } else {
            console.log("this ... ", json);
            alert("There is some error getting intersts");

        }

    }

    useEffect(() => {
        getInterests();
    }, []);

    return (
        <>
            <div className='container p-10'>
                <h1 className='text-xl font-bold text-center mt-20 mb-6'>ADD A STUDENT</h1>
                <form onSubmit={handleSubmit} className='w-4/5 h-full m-auto'>
                <p className="text-green-700 mb-6">Hover over the City,Degree,Department,Gender and Interest filed to see the <i>Special Dropdown</i> </p>
                    <div className='flex flex-row flex-wrap gap-6 mt-3'>
                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="name">Full Name</label>
                            <input autoComplete="off" onChange={onChange} className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="text" name="name" placeholder="Name" required />
                        </div>

                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="email">Email</label>
                            <input autoComplete="off" onChange={onChange} className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="email" name="email" placeholder="xyz@gmail.com" required />
                        </div>
                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="rollnumber">Roll Number</label>
                            <input autoComplete="off" onChange={onChange} className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="text" name="rollnumber" placeholder="e.g BITF20M0XX" required />
                        </div>
                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="subject">Subject</label>
                            <input autoComplete="off" onChange={onChange} className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="text" name="subject" placeholder="Subject" required />
                        </div>

                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="interest">Interest</label>
                            <input
                                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                                onChange={onChange}
                                value={credentials.interest}
                                list="browsers1"
                                id="browser1"
                                name="interest"

                            />
                            <datalist id="browsers1">
                                {interest.map((inrst) => (
                                    <option key={inrst.id} value={inrst.interest} />
                                ))}
                            </datalist>
                        </div>

                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="city">City</label>
                            <input
                                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                                onChange={onChange}
                                value={credentials.city}
                                list="browsers2"
                                id="browser2"
                                name="city"

                            />
                            <datalist id="browsers2">
                                <option value="Lahore" />
                                <option value="Islamabad" />
                                <option value="Karachi" />
                                <option value="Raheem Yar Khan" />
                                <option value="Multan" />
                                <option value="Faisalabad" />
                            </datalist>
                        </div>

                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="dob">Date of Birth</label>
                            <input onChange={onChange} className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="date" name="dob" placeholder="" required />
                        </div>


                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="gender">Gender</label>
                            <input
                                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                                onChange={onChange}
                                value={credentials.gender}
                                list="browsers3"
                                id="browser3"
                                name="gender"

                            />
                            <datalist id="browsers3">
                                <option value="Male" />
                                <option value="female" />

                            </datalist>
                        </div>
                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="degreetitle">Degree title</label>
                            <input
                                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                                onChange={onChange}
                                value={credentials.degree}
                                list="browsers4"
                                id="browser4"
                                name="degree"

                            />
                            <datalist id="browsers4">
                                <option value="Associate Degree" />
                                <option value="Bachelors Degree" />
                                <option value="Doctorate" />
                                <option value="M.Phill Degree" />
                                <option value="Post Doctorate" />

                            </datalist>
                        </div>

                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="department">Department</label>
                            <input
                                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                                onChange={onChange}
                                value={credentials.department}
                                list="browsers5"
                                id="browser"
                                name="department"

                            />
                            <datalist id="browsers5">
                                <option value="Information Technology" />
                                <option value="Computer Science" />
                                <option value="Software Engineering" />
                                <option value="Department of Pharmacy" />
                                <option value="Art Department" />

                            </datalist>
                        </div>
                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="startdate">Start Date</label>
                            <input onChange={onChange} className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="date" name="startdate" placeholder="" required />
                        </div>

                        <div>
                            <label className="text-gray-600  inline-block pb-2" htmlFor="enddate">End Date</label>
                            <input onChange={onChange} className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="date" name="enddate" placeholder="" required />
                        </div>
                        <button className='bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded '>Add Student</button>
                        <button onClick={() => { window.location.reload(); }} className='bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded '>Cancel</button>

                    </div>

                </form>

            </div>
            
        </>
    );
};

export default AddStudentForm;
