import { Button } from "flowbite-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { Datepicker } from 'flowbite-react';
import { UserState } from "../../context/UserProvider";
import moment from "moment"

function AddLeave() {

  const [isLoading, setIsLoading] = useState(false)
  const { user } = UserState()
  const navigate = useNavigate()
  const [leave, setLeave] = useState({
    date_leave: '',
  });

  const handleInput = (e) => {
    e.persist();
    console.log({ [e.target.name]: e.target.value })
    let value = e.target.value;
    setLeave({ ...leave, [e.target.name]: value });
  }

  const saveLeave = () => {

    const inputEl = document.querySelector('input')

    const data = {
      employee_id: user.employee.id,
      date_leave: moment(inputEl.value).format('YYYY-MM-DD') ,
      is_approved: false,
    }
    console.log(data)

    fetchClient.post('/api/leaves', data)
      .then(res => {
        navigate('/leaves')
      })
      .catch(err => console.error(err));
  }
  

  return (
    
    <div className="h-screen">
      <div className="text-cyan-950 flex justify-between p-3 ">
        <Button as={Link} to="/leaves">
          <i className="fa-solid fa-angle-left"></i>
        </Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <div>
        <div
          className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
          
        >
          <h4 className="text-xl font-semibold text-center dark:text-gray-50">Add Leave</h4>
          <div className="mb-4">
            <label htmlFor="date_leave" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
              Date Leave
              <Datepicker />
            </label>
          </div>
          <div className="flex justify-end">
            <Link
              to='/leaves'
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={saveLeave}
            >
              Save
            </button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default AddLeave;