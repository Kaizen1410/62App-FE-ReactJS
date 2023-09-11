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
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route element={<Layout />} >
            <Route path='/' element={<Home />} />
            <Route path='/leaves' element={<Leave />} />
            <Route path='/leaves/add' element={<AddLeave />} />
            <Route path='/leaves/:id/edit' element={<EditLeave />} />

            <Route path='/roles' element={<Roles />} />
            <Route path='/roles/add' element={<AddRoles />} />
            <Route path='/roles/:id/edit' element={<EditRoles />} />

            <Route path='/user-roles' element={<UserRoles />} />
            <Route path='/user-roles/add' element={<AddUserRoles />} />
            <Route path='/user-roles/:id/edit' element={<EditUserRoles />} />

            <Route path='employees' element={<Employees />} />
            <Route path='/employees/add' element={<AddEmployees />} />
            <Route path='/employees/:id/edit' element={<EditEmployees />} />

            <Route path='/employee-positions' element={<EmployeePositions />} />
            <Route path='/employee-positions/add' element={<AddEmployeePositions />} />
            <Route path='/employee-positions/:id/edit' element={<EditEmployeePositions />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
