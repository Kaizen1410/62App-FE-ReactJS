import { Button, Checkbox, Select, TextInput, ToggleSwitch } from "flowbite-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import { Datepicker } from 'flowbite-react';
import { UserState } from "../../context/UserProvider";
import moment from "moment"
import { BeatLoader } from "react-spinners";
import { getEmployees } from "../../api/ApiEmployee";
import Loading from "../../components/Loading";
import { addLeave } from "../../api/ApiLeave";

function AddLeave() {
  const [isLoading, setIsLoading] = useState(false);
  const [addIsLoading, setAddIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { setNotif } = UserState();

  // form
  const [employeeId, setEmployeeId] = useState(1);
  const [isApproved, setIsApproved] = useState(false);
  const [approvedBy, setApprovedBy] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);


  const getAllEmployees = async () => {
    setIsLoading(true);
    const { data, error } = await getEmployees();
    if (error) {
      console.error(error);
      return
    }

    setEmployees(data);
    setIsLoading(false);
  }

  // Add Leave
  const saveLeave = async () => {
    setAddIsLoading(true);
    const inputEl = document.querySelector('input');

    const body = {
      employee_id: employeeId,
      date_leave: moment(inputEl.value).format('YYYY-MM-DD'),
      is_approved: isApproved,
    }

    if (isApproved) {
      body.approved_by = approvedBy
    }

    const { message, error } = await addLeave(body);
    if(error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error.response?.data.message }]);
    } else {
      setNotif(prev => [...prev, { type: 'success', message }]);
      navigate('/leaves');
    }
    setAddIsLoading(false);
  }

  return (
    isLoading ? <Loading size='xl' /> : <div
      className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
    >
      <h4 className="text-xl font-semibold text-center mb-5 dark:text-gray-50">Add Leave</h4>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">Name</label>
        <Select id="name" value={employeeId} onChange={e => setEmployeeId(e.target.value)}>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>{employee.name}</option>
          ))}
        </Select>

        <label htmlFor="date_leave" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
          Date Leave
        </label>
        <Datepicker id="date_leave" />

        <label htmlFor="isApproved" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
          Is Approved
        </label>
        <ToggleSwitch
          checked={isApproved}
          onChange={() => setIsApproved(prev => !prev)}
        />

        {isApproved && (
          <>
            <label htmlFor="approvedBy" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">Approved By</label>
            <Select id="approvedBy" value={approvedBy} onChange={e => setApprovedBy(e.target.value)}>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
            </Select>
          </>
        )}
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
        {addIsLoading
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