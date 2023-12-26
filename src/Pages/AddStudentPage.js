import React from 'react'
import AddStudentForm from '../Components/AddStudentForm'
import Navbar from '../Components/Navbar'

const AddStudentPage = () => {
  return (
    <>
    <Navbar />
    <h1 className='text-xl font-bold text-center mt-5 mb-3'>ADD A STUDENT</h1>
    <AddStudentForm />
    </>
  )
}

export default AddStudentPage
