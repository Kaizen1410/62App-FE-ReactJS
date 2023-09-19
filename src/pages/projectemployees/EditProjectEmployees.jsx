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
  const [status, setStatus] = useState('');
  const { setNotif } = UserState();

  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve selected Project data
  useEffect(() => {
    const getProjectEmployee = async () => {
      try {
        const res = await fetchClient.get(`/api/project-employees/${id}`)
        setStatus(res.data.data.status);
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

    const startEl = document.querySelector('#start_date');
    const endEl = document.querySelector('#end_date');

    const data = {
      start_date: moment(startEl.value).format('YYYY-MM-DD'),
      end_date: moment(endEl.value).format('YYYY-MM-DD'),
      status
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
            <Datepicker id="start_date" />
          </div>
          <div>
            <label htmlFor="end_date" className="block mt-2 text-gray-700 dark:text-gray-50 font-bold mb-2">
              End Date
            </label>
            <Datepicker id="end_date" />
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
              value={status} className='w-full' onChange={(e) => setStatus(e.target.value)}
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