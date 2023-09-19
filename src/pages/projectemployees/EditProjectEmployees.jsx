import { Button, Datepicker, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import Loading from '../../components/Loading'
import { UserState } from '../../context/UserProvider'
import fetchClient from '../../utils/fetchClient'
import moment from 'moment'

const EditProjectEmployees = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const { setNotif } = UserState();
  const [projectEmployee, setProjectEmployee] = useState()

  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve selected Project data
  useEffect(() => {
    const getProjectEmployee = async () => {
      try {
        const res = await fetchClient.get(`/api/project-employees/${id}`);
        setProjectEmployee(res.data.data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false)
    }
    getProjectEmployee()
  }, [id]);

  // Update Project
  const updateProject = async (e) => {
    e.preventDefault();
    setUpdateIsLoading(true);

    const data = {
      start_date: moment(projectEmployee.start_date).format('YYYY-MM-DD'),
      end_date: moment(projectEmployee.end_date).format('YYYY-MM-DD'),
      status: projectEmployee.status
    }

    fetchClient.put(`/api/project-employees/${id}`, data)
      .then(res => {
        setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
        navigate('/project-employees');
      })
      .catch(err => {
        console.error(err);
        setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
      })
      .finally(() => setUpdateIsLoading(false));
  }


  return (
    isLoading ? <Loading size='xl' /> :
      <div className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md">
        <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit Project Employee</h4>

        <div className="mb-4 dark:text-gray-50">
          <div>
            <label htmlFor="start_date" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
              Start Date
            </label>
            <input type="date" id="date_leave"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              value={projectEmployee?.start_date}
              onChange={e => setProjectEmployee(prev => ({...prev, start_date: e.target.value}))} />
          </div>
          <div>
            <label htmlFor="end_date" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
              End Date
            </label>
            <input type="date" id="end_date"
              className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
              value={projectEmployee?.end_date}
              onChange={e => setProjectEmployee(prev => ({...prev, end_date: e.target.value}))} />
          </div>
          <div
            className="max-w-md"
            id="select"
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
              value={projectEmployee?.status} className='w-full' onChange={(e) => setProjectEmployee(prev => ({...prev, status: e.target.value}))}
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
            : <Button type="button" onClick={updateProject}>
              Save
            </Button>}
        </div>
      </div>
  )
}

export default EditProjectEmployees