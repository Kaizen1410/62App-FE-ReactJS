import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Leave from './pages/Leave';
import Roles from './pages/Roles';
import UserRoles from './pages/UserRoles';
import Employees from './pages/Employees';
import EmployeePositions from './pages/EmployeePositions';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/leave' element={<Leave />} />
        <Route path='/home/roles' element={<Roles />} />
        <Route path='/home/userroles' element={<UserRoles />} />
        <Route path='/home/employees' element={<Employees />} />
        <Route path='/home/employeepositions' element={<EmployeePositions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
