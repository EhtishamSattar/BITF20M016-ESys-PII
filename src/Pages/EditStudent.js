import React from 'react'
import EditStudentForm from '../Components/EditStudentForm'
import Navbar from '../Components/Navbar'

const EditStudent = () => {
    
  return (
    <>
    <Navbar />
    <h1 className='text-xl font-bold text-center mt-5 mb-3'>UPDATE STUDENT</h1>
    <EditStudentForm />
    </>
  )
}

export default EditStudent
