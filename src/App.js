import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Leaves from './pages/leave/Leaves';
import Roles from './pages/roles/Roles';
import UserRoles from './pages/userroles/UserRoles';
import Employees from './pages/employees/Employees';
import EmployeePositions from './pages/employeepositions/EmployeePositions';
import AddLeave from './pages/leave/AddLeave';
import EditLeave from './pages/leave/EditLeave';
import AddRoles from './pages/roles/AddRoles';
import EditRoles from './pages/roles/EditRoles';
import EditUserRoles from './pages/userroles/EditUserRoles';
import AddEmployees from './pages/employees/AddEmployees';
import EditEmployees from './pages/employees/EditEmployees';
import UserProvider from './context/UserProvider';
import Layout from './components/Layout';
import Calendar from './pages/Calendar';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route element={<Layout />} >
            <Route path='/' element={<Home />} />
            <Route path='/leaves' element={<Leaves />} />
            <Route path='/leaves/add' element={<AddLeave />} />
            <Route path='/leaves/:id/edit' element={<EditLeave />} />

            <Route path='/roles' element={<Roles />} />
            <Route path='/roles/add' element={<AddRoles />} />
            <Route path='/roles/:id/edit' element={<EditRoles />} />

            <Route path='/user-roles' element={<UserRoles />} />
            <Route path='/user-roles/:id/edit' element={<EditUserRoles />} />

            <Route path='/employees' element={<Employees />} />
            <Route path='/employees/add' element={<AddEmployees />} />
            <Route path='/employees/:id/edit' element={<EditEmployees />} />

            <Route path='/employee-positions' element={<EmployeePositions />} />
            <Route path='/calendar' element={<Calendar />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
