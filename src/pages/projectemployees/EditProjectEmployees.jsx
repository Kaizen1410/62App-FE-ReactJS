import { Button, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import Loading from '../../components/Loading'
import { UserState } from '../../context/UserProvider'
import { oneProjectEmployee, updateProjectEmployee } from '../../api/ApiProjectEmployee'
import { getProjects } from '../../api/ApiProject'
import { getEmployees } from '../../api/ApiEmployee'

const EditProjectEmployees = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const { setNotif } = UserState();
  const [projectEmployee, setProjectEmployee] = useState()
  const [employees, setEmployees] = useState([])
  const [projects, setProjects] = useState([])

  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve selected Project data
  useEffect(() => {
    const getRequiredData = async () => {
      setIsLoading(true);
      const projectEmployeeData = oneProjectEmployee(id);
      const employeesData = getEmployees();
      const projectsData = getProjects();
  
      const [employees, projects, projectEmployee] = await Promise.all([employeesData, projectsData, projectEmployeeData]);
      if(employees.error || projects.error || projectEmployee.error) {
        console.error(employees.error);
        console.error(projects.error);
        console.error(projectEmployee.error);
      } else {
        setProjectEmployee(projectEmployee.data);
        setEmployees(employees.data);
        setProjects(projects.data);
      }
      setIsLoading(false);
    }

    getRequiredData();
  }, [id]);

  // Update Project
  const _updateProjectEmployee = async (e) => {
    e.preventDefault();
    setUpdateIsLoading(true);

    const body = {
      employee_id: projectEmployee.employee_id,
      project_id: projectEmployee.employee_id,
      status: projectEmployee.status
    }

    if(projectEmployee.start_date) {
      body.start_date = projectEmployee.start_date
    }
    if(projectEmployee.end_date) {
      body.end_date = projectEmployee.end_date
    }

    const { error, message } = await updateProjectEmployee(id, body);
    if (error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setNotif(prev => [...prev, { type: 'success', message }]);
      navigate('/project-employees');
    }

    setUpdateIsLoading(false);
  }


  return (
    isLoading ? <Loading size='xl' /> :
      <div className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md">
        <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit Project Employee</h4>

        <div className="mb-4 dark:text-gray-50">
        <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
              Employee Name
            </label>
            <Select
              value={projectEmployee?.employee_id}
              onChange={(e) => setProjectEmployee(prev => ({...prev, employee_id: e.target.value}))}
              id="name"
              className="w-full"
            >
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="project" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
              Project Name
            </label>
            <Select
              value={projectEmployee?.project_id}
              onChange={(e) => setProjectEmployee(prev => ({...prev, project_id: e.target.value}))}
              id="project"
              className="w-full"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </Select>
            </div>
          <div>
            <label htmlFor="start_date" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
              Start Date
            </label>
            <input type="date" id="start_date"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              value={projectEmployee?.start_date}
              onChange={e => setProjectEmployee(prev => ({ ...prev, start_date: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="end_date" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
              End Date
            </label>
            <input type="date" id="end_date"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              value={projectEmployee?.end_date}
              onChange={e => setProjectEmployee(prev => ({ ...prev, end_date: e.target.value }))} />
          </div>
          <div
            className="max-w-md"
          >
            <div className="mb-2 block">
              <label htmlFor="status" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
                Status
              </label>
            </div>
            <Select
              id="status"
              name="status"
              required
              value={projectEmployee?.status} className='w-full' onChange={(e) => setProjectEmployee(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value={1} >
                Planning
              </option>
              <option value={2} >
                Join
              </option>
            </Select>
          </div>
 


        </div>

        <div className="flex justify-end">
          <Button
            as={Link}
            color="failure"
            to='/project-employees'
            className="mr-2"
          >
            Cancel
          </Button>
          {updateIsLoading
            ? <Button type="button" disabled>
              <BeatLoader color="white" size={6} className='my-1 mx-2' />
            </Button>
            : <Button type="button" onClick={_updateProjectEmployee}>
              Save
            </Button>}
        </div>
      </div>
  )
}

export default EditProjectEmployees