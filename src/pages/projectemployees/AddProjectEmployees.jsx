import { Button, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserState } from '../../context/UserProvider';
import moment from 'moment';
import Loading from '../../components/Loading';
import { BeatLoader } from 'react-spinners';
import { getEmployees } from '../../api/ApiEmployee';
import { getProjects } from '../../api/ApiProject';
import { addProjectEmployee } from '../../api/ApiProjectEmployee';

const AddProjectEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [projects, setProjects] = useState([])
  const [employeeId, setEmployeeId] = useState(1)
  const [projectId, setProjectId] = useState(1)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState(1)
  const [isLoading, setIsLoading] = useState(true);
  const [addIsLoading, setAddIsLoading] = useState(false);

  const { setNotif } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    getRequiredData();
  }, []);

  const getRequiredData = async () => {
    setIsLoading(true);
    const employeesData = getEmployees();
    const projectsData = getProjects();

    const [employees, projects] = await Promise.all([employeesData, projectsData]);
    if(employees.data) {
      setEmployees(employees.data);
    }
    if(projects.data) {
      setProjects(projects.data);
    }
    setIsLoading(false);
  }

  const saveProjectEmployees = async () => {
    setAddIsLoading(true)

    const body = {
      employee_id: employeeId,
      project_id: projectId,
      status: status,
    }

    if(startDate) {
      body.start_date = startDate
    }
    if(endDate) {
      body.end_date = endDate
    }

    const { error, message } = await addProjectEmployee(body);
    if(error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setNotif(prev => [...prev, { type: 'success', message }]);
      navigate('/project-employees');
    }

    setAddIsLoading(false);
  }

  return (
    isLoading ? <Loading size='xl' /> :
      <div className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md">
        <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Add Project Employee</h4>

        <div className="mb-4 dark:text-gray-50">
          <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
              Employee Name
            </label>
            <Select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
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
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              id="project"
              className="w-full"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </Select>
          </div>
          <div>
            <label className="text-gray-700 font-bold dark:text-gray-50" htmlFor="start_date">Start Date</label>
            <input type="date" id="start_date"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              value={startDate}
              onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="text-gray-700 font-bold dark:text-gray-50" htmlFor="end_date">End Date</label>
            <input type="date" id="end_date"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              value={endDate}
              onChange={e => setEndDate(e.target.value)} />
          </div>
          <div
            className="max-w-md"
          >
            <div className="mb-2 block">
              <label className="text-gray-700 font-bold dark:text-gray-50"
                htmlFor="status"
              >Status</label>
            </div>
            <Select
              id="status"
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={1}>
                Planning
              </option>
              <option value={2}>
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
          {addIsLoading
            ? <Button type="button" disabled>
              <BeatLoader color="white" size={6} className='my-1 mx-2' />
            </Button>
            : <Button type="button" onClick={saveProjectEmployees}>
              Save
            </Button>}
        </div>
      </div>
  )
}

export default AddProjectEmployees