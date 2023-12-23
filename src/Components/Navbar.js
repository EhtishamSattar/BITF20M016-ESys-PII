import React from 'react'
import { Link } from 'react-router-dom'	

const Navbar = () => {
    return (
        <>
            <div className='navbar flex flex-row justify-between fixed top-0 w-screen p-4 pt-4 bg-black'>

                <div className='text-white text-xl font-semibold pl-5'>
                    Student Interests System
                </div>
                <div className='pr-12 text-white relative'>

                    <Link to="/dashboard" className="pl-5  hover:text-pink-500">Dashboard</Link>
                    <Link to="/addStudent" className="text-red pl-5  hover:text-pink-500">Add Student</Link>
                    <Link to="/studentlist" className="text-red pl-5  hover:text-pink-500">Student List</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
