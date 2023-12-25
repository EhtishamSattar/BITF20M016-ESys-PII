import { Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
// import AddStudent from './Pages/addStudent';
import AddStudentPage from './Pages/AddStudentPage';
import Dashboard from './Pages/Dashboard';
import Studentlist from './Pages/Studentlist';
import EditStudent from './Pages/EditStudent';
import ViewStudent from './Pages/ViewStudent';


function App() {

  return (
    <>
    <Routes>
     <Route path="/" element={<Login />} />
      <Route path="/addStudent" element={<AddStudentPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/studentlist" element={<Studentlist />} />
      <Route path="/editStudent" element={<EditStudent/>} />
      <Route path="/viewStudent" element={<ViewStudent/>} />
    </Routes>
    </>
  );
}

export default App;
