import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leaves from './pages/leave/Leaves';
import Roles from './pages/roles/Roles';
import UserRoles from './pages/userroles/UserRoles';
import Employees from './pages/employees/Employees';
import EmployeePositions from './pages/employeepositions/EmployeePositions';
import EditEmployeesPosition from './pages/employeepositions/EditEmployeesPosition';
import AddEmployeesPosition from './pages/employeepositions/AddEmployeesPosition';
import AddLeave from './pages/leave/AddLeave';
import EditLeave from './pages/leave/EditLeave';
import AddRole from './pages/roles/AddRole';
import EditRole from './pages/roles/EditRole';
import EditUserRoles from './pages/userroles/EditUserRoles';
import AddEmployee from './pages/employees/AddEmployee';
import EditEmployee from './pages/employees/EditEmployee';
import UserProvider from './context/UserProvider';
import Layout from './components/Layout';
import Calendar from './pages/Calendar';
import ProjectEmployees from './pages/projectemployees/ProjectEmployees';
import EditProjectEmployees from './pages/projectemployees/EditProjectEmployees';
import AddProjectEmployees from './pages/projectemployees/AddProjectEmployees';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route element={<Layout />} >
            <Route path='/' element={<Dashboard />} />

            <Route path='/leaves' element={<Leaves />} />
            <Route path='/leaves/add' element={<AddLeave />} />
            <Route path='/leaves/:id/edit' element={<EditLeave />} />

            <Route path='/roles' element={<Roles />} />
            <Route path='/roles/add' element={<AddRole />} />
            <Route path='/roles/:id/edit' element={<EditRole />} />

            <Route path='/user-roles' element={<UserRoles />} />
            <Route path='/user-roles/:id/edit' element={<EditUserRoles />} />

            <Route path='/employees' element={<Employees />} />
            <Route path='/employees/add' element={<AddEmployee />} />
            <Route path='/employees/:id/edit' element={<EditEmployee />} />

            <Route path='/employee-positions' element={<EmployeePositions />} />
            <Route path='/employee-positions/add' element={<AddEmployeesPosition />} />
            <Route path='/employee-positions/:id/edit' element={<EditEmployeesPosition />} />
            <Route path='/calendar' element={<Calendar />} />

            <Route path='/projectemployees' element={<ProjectEmployees />} />
            <Route path='/projectemployees/:id/edit' element={<EditProjectEmployees />} />
            <Route path='/projectemployees/add' element={<AddProjectEmployees />} />
            
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
