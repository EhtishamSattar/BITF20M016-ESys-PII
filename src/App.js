import { Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
// import AddStudent from './Pages/addStudent';
import AddStudentPage from './Pages/AddStudentPage';
import Dashboard from './Pages/Dashboard';
import Studentlist from './Pages/Studentlist';
import { useEffect } from 'react';

function App() {

  useEffect(() => { 
    alert("There is just a Login Page implemented , you cant signUp So,\nEnter with email : admin@gmail.com\nPassword : admin")
  }, [])
  return (
    <>
    <Routes>
     <Route path="/" element={<Login />} />
      <Route path="/addStudent" element={<AddStudentPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/studentlist" element={<Studentlist />} />
    </Routes>
    </>
  );
}

export default App;
