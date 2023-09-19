import { Button, Datepicker, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fetchClient from '../../utils/fetchClient';
import { UserState } from '../../context/UserProvider';
import moment from 'moment';
import Loading from '../../components/Loading';
import { BeatLoader } from 'react-spinners';

const AddProjectEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [projects, setProjects] = useState([])
  const [employeeId, setEmployeeId] = useState(1)
  const [projectId, setProjectId] = useState(1)
  const [status, setStatus] = useState(1)
  const [isLoading, setIsLoading] = useState(true);
  const [addIsLoading, setAddIsLoading] = useState(false);

  const { setNotif } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees()
    getProjects()
  }, [])

  const getEmployees = () => {
    setIsLoading(true);
    fetchClient.get('/api/employees?per_page=999')
      .then(res => setEmployees(res.data.data))
      .catch(err => { console.error(err); setIsLoading(false) })
  }

  const getProjects = () => {
    setIsLoading(true);
    fetchClient.get('/api/projects?per_page=999')
      .then(res => setProjects(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }

  const saveProjectEmployees = () => {
    setAddIsLoading(true)
    const startEl = document.querySelector('#start_date');
    const endEl = document.querySelector('#end_date');

    const data = {
      employee_id: employeeId,
      project_id: projectId,
      start_date: moment(startEl.value).format('YYYY-MM-DD'),
      end_date: moment(endEl.value).format('YYYY-MM-DD'),
      status: status,
    }

    fetchClient.post('/api/project-employees', data)
      .then(res => {
        setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
        navigate('/project-employees');
      })
      .catch(err => {
        console.error(err);
        setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
      })
      .finally(() => setAddIsLoading(false))
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
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
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
            <label className="text-gray-700 font-bold dark:text-gray-50" htmlFor="start_date ">Start Date</label>
            <Datepicker
              id="start_date"
            />
          </div>
          <div>
            <label className="text-gray-700 font-bold dark:text-gray-50" htmlFor="end_date">End Date</label>
            <Datepicker
              id="end_date"
            />
          </div>
          <div
            className="max-w-md"
            id="select"
          >
            <div className="mb-2 block">
              <label className="text-gray-700 font-bold dark:text-gray-50"
                htmlFor="status"
              >Status</label>
            </div>
            <Select
              id="Status"
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