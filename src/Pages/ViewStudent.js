import React from 'react'
import Navbar from '../Components/Navbar'

const ViewStudent = () => {
    const student=JSON.parse(localStorage.getItem('student'))
  return (
    <>
    <Navbar />
    <div className='mt-4'>
      <h1 className='text-center text-xl font-bold'>{student.name}'s Details</h1>
    </div>
    <div className='details flex flex-col flex-wrap w-4/5 h-screen m-auto border-gray-500' style={{"border":"2px","borderColor":"gray"}}>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Name :
            </div>
            <div className='ml-4'>
                {student.name}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Email :
            </div>
            <div className='ml-4'>
                {student.email}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Roll Number :
            </div>
            <div className='ml-4'>
                {student.rollnumber}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Gender :
            </div>
            <div className='ml-4'>
                {student.gender}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Date of Birth :
            </div>
            <div className='ml-4'>
                {student.dateOfBirth}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Degree :
            </div>
            <div className='ml-4'>
                {student.degree}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Department :
            </div>
            <div className='ml-4'>
                {student.department}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Subject :
            </div>
            <div className='ml-4'>
                {student.subject}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Interest :
            </div>
            <div className='ml-4'>
                {student.interest}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                Subject :
            </div>
            <div className='ml-4'>
                {student.subject}
            </div>

        </div>
        <div className='flex flex-row justify-start p-2'>
            <div className="font-normal">
                End Date :
            </div>
            <div className='ml-4'>
                {student.endDate}
            </div>
        </div>

    </div>
    </>
  )
}

export default ViewStudent
