import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const StudentListSheet = () => {
    let navigate=useNavigate();
    const [students, setStudents] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                sort: 'desc',
                width: 200,

            },
            {
                label: 'Email',
                field: 'email',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Roll Number',
                field: 'rollnumber',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Gender',
                field: 'gender',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Interest',
                field: 'interest',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Subject',
                field: 'subject',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Degree',
                field: 'degree',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Department',
                field: 'department',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Date of Birth',
                field: 'dateOfBirth',
                sort: 'asc',
                width: 270
            },
            {
                label: 'City',
                field: 'city',
                sort: 'asc',
                width: 270
            }

        ], rows: students.map((student) => ({
            // ... (other fields)
            name: student.name,
            email: student.email,
            rollnumber: student.rollnumber,
            city: student.city,
            dateOfBirth: student.dateOfBirth,
            department: student.department,
            degree: student.degree,
            interest: student.interest,
            gender: student.gender,
            subject: student.subject,
            endDate: student.endDate,
        })),
    };


    const getAllStudents = async (e) => {

        const response = await fetch("http://localhost:5000/api/student/getAllStudents", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        console.log("----" + json.success)

        if (json.success) {
            setStudents(json.students);

            console.log("students from database", students);

        } else {
            console.log("this ... ", json);
            alert("There is some error getting studetns list :(");

        }

    }

    useEffect(() => {
        getAllStudents();
    }, []);

    return (

        <>
            <div className='w-full text-white bg-black text-xl font-semibold flex justify-between p-4'>
                <div>
                    Student Interests System
                </div>
                <div onClick={()=>{navigate("/")}} className='hover:text-red-300 cursor-pointer'>
                    Logout
                </div>
            </div>
            <div className='datatable px-10 py-4 mt-3'>
                <h2>Search through your Email i.e email@gmail.com</h2>
                <MDBDataTable
                    bordered
                    responsive
                    sorting="true"
                    entriesOptions={[5, 10, 20, 30, 50]}
                    data={data}
                />
            </div>

        </>

    );
}

export default StudentListSheet
