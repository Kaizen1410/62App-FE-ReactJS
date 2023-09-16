import { Button } from "flowbite-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import { Datepicker } from 'flowbite-react';
import { UserState } from "../../context/UserProvider";
import moment from "moment"
import { BeatLoader } from "react-spinners";

function AddLeave() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setNotif } = UserState();
  const navigate = useNavigate();

  // Add Leave
  const saveLeave = () => {
    setIsLoading(true);
    const inputEl = document.querySelector('input');

    const data = {
      employee_id: user.employee.id,
      date_leave: moment(inputEl.value).format('YYYY-MM-DD'),
      is_approved: false,
    }

    fetchClient.post('/api/leaves', data)
      .then(res => {
        setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
        navigate('/leaves');
      })
      .catch(err => {
        console.error(err);
        setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div
      className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
    >
      <h4 className="text-xl font-semibold text-center mb-5 dark:text-gray-50">Add Leave</h4>
      <div className="mb-4">
        <label htmlFor="date_leave" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
          Date Leave
        </label>
        <Datepicker id="date_leave" />
      </div>
      <div className="flex justify-end">
        <Button
          color="failure"
          as={Link}
          to='/leaves'
          className="mr-2"
        >
          Cancel
        </Button>
        {isLoading
          ? <Button type="button" disabled>
            <BeatLoader color="white" size={6} className='my-1 mx-2' />
          </Button>
          : <Button type="button" onClick={saveLeave}>
            Save
          </Button>}
      </div>
    </div>
  )
}

export default AddLeave;