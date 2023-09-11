import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Leave from './pages/leave/Leave';
import Roles from './pages/roles/Roles';
import UserRoles from './pages/userroles/UserRoles';
import Employees from './pages/employees/Employees';
import EmployeePositions from './pages/employeepositions/EmployeePositions';
import AddLeave from './pages/leave/AddLeave';
import EditLeave from './pages/leave/EditLeave';
import AddRoles from './pages/roles/AddRoles';
import EditRoles from './pages/roles/EditRoles';
import AddUserRoles from './pages/userroles/AddUserRoles';
import EditUserRoles from './pages/userroles/EditUserRoles';
import AddEmployees from './pages/employees/AddEmployees';
import EditEmployees from './pages/employees/EditEmployees';
import AddEmployeePositions from './pages/employeepositions/AddEmployeePositions';
import EditEmployeePositions from './pages/employeepositions/EditEmployeePositions';
import UserProvider from './context/UserProvider';

function App() {
  axios.defaults.baseURL = 'http://localhost:8000/';

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          
          <Route path='/leave' element={<Leave />} />
          <Route path='/leave/add' element={<AddLeave />} />
          <Route path='/leave/edit' element={<EditLeave />} />

          <Route path='/roles' element={<Roles />} />
          <Route path='/roles/add' element={<AddRoles />} />
          <Route path='/roles/edit' element={<EditRoles />} />

          <Route path='/userroles' element={<UserRoles />} />
          <Route path='/userroles/add' element={<AddUserRoles />} />
          <Route path='/userroles/edit' element={<EditUserRoles />} />

          <Route path='/employees' element={<Employees />} />
          <Route path='/employees/add' element={<AddEmployees />} />
          <Route path='/employees/:id/edit' element={<EditEmployees />} />

          <Route path='/employeepositions' element={<EmployeePositions />} />
          <Route path='/employeepositions/add' element={<AddEmployeePositions />} />
          <Route path='/employeepositions/edit' element={<EditEmployeePositions />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
