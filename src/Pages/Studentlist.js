import React from 'react'
import Navbar from '../Components/Navbar'
import DatatablePage from '../Components/Datatable'

const Studentlist = () => {
  return (
    <>
    <Navbar />
    <div className='mt-4'>
      <h1 className='text-center text-3xl font-bold'>Students' List</h1>
      <DatatablePage />
    </div>
    </>
  )
}

export default Studentlist
