import React from 'react'
import { Link } from 'react-router-dom'	

const Navbar = () => {
    return (
        <>
            <div className='navbar flex flex-row justify-between fixed top-0 w-screen p-4 pt-4 bg-black'>

                <div className='text-white font-medium pl-5 text-xl'>
                    Student Interests System
                </div>
                <div className='pr-12 text-white relative'>

                    <Link to="/dashboard" className="pl-4 text-white hover:text-red-500">Dashboard</Link>
                    <Link to="/addStudent" className="pl-4 text-white hover:text-red-500">Add Student</Link>
                    <Link to="/studentlist" className="pl-4 text-white hover:text-red-500">Student List</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
