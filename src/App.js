import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Leave from './pages/Leave';
import Login from './pages/Login';
import Roles from './pages/Roles';
import UserRoles from './pages/UserRoles';
import Employees from './pages/Employees';
import EmployeePositions from './pages/EmployeePositions';

function App() {
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/home' element={<Home />} />
    <Route path='/home/leave' element={<Leave />} />
    <Route path='/home/roles' element={<Roles />} />
    <Route path='/home/userroles' element={<UserRoles />} />
    <Route path='/home/employees' element={<Employees />} />
    <Route path='/home/employeepositions' element={<EmployeePositions />} />
  </Routes>
  return (
    <div>
      <Navbar />

      <Home />
    </div>
  );
}

export default App;
