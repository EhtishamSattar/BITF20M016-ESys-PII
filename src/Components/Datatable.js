import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DatatablePage = () => {
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
            },
            {
                label: 'End date',
                field: 'endDate',
                sort: 'asc',
                width: 270
            },{
                label: 'Actions',
                field: 'actions',
                width: 270,
              },


        ],rows:students.map((student) => ({
            // ... (other fields)
            name: student.name,
            email: student.email,
            rollnumber: student.rollnumber,
            city: student.city,
            dateOfBirth: student.dateOfBirth,
            department: student.department,
            degree: student.degree,
            interest: student.interest,
            gender:student.gender,
            subject:student.subject,
            endDate:student.endDate,
            actions: (
              <div>
                <Link to="#" className=" mr-2 text-pink-600 font-medium" aria-hidden="true" onClick={() => handleActionClick('view', student)}>View</Link>
                <Link to={`/editStudent/${student.id}`} className="mr-2 blue-text font-medium" aria-hidden="true" onClick={() => handleActionClick('edit', student)}>Edit</Link>
                <Link to="#" className=" red-text font-medium" aria-hidden="true" onClick={() => handleActionClick('delete', student)}>Delete</Link>
              </div>
            ),
          })),
    };

    const handleActionClick = (action, student) => {
        switch (action) {
          case 'view':
            console.log("View clicked for student:", student);
            break;
          case 'edit':
            console.log("Edit clicked for student:", student);
            break;
          case 'delete':
            console.log("Delete clicked for student:", student);
            break;
          default:
            break;
        }
    
        setSelectedRow(student);
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
        
            console.log("students from database",students);

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
            <div className='datatable p-10'>
                <MDBDataTable 
                    striped
                    bordered
                    responsive
                    sorting="true"
                    entriesOptions={[5, 10, 20, 30,50]}
                    data={data}
                />
            </div>

        </>

    );
}

export default DatatablePage;