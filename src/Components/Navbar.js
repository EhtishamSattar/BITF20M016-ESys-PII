import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate=useNavigate();
    return (
        <>
            <div className='navbar flex flex-row justify-between fixed top-0 w-screen p-4 pt-4 bg-black'>

                <div className='text-white font-medium pl-5 text-xl'>
                    Student Interests System
                </div>
                <div className='pr-12 text-white relative'>

                
                    {/* <Link to="/addStudent" className="pl-4 text-white hover:text-red-500">Add Student</Link>
                    <Link to="/studentlist" className="pl-4 text-white hover:text-red-500">Student List</Link> */}
                    <div onClick={()=>navigate("/dashboard")} className="pl-4 text-white hover:text-red-500 inline-block cursor-pointer">
                        Dashboard
                    </div>
                    <div onClick={()=>navigate("/addStudent")} className="pl-4 text-white hover:text-red-500 inline-block cursor-pointer">
                        Add Student
                    </div>
                    <div onClick={()=>navigate("/studentlist")} className="pl-4 text-white hover:text-red-500 inline-block cursor-pointer">
                        Student List
                    </div>
                    <div onClick={()=>navigate("/")} className="pl-4 text-white hover:text-red-500 inline-block cursor-pointer">
                        Logout
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar
