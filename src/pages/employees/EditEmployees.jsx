import { Button, Select, TextInput } from "flowbite-react"
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { BeatLoader } from 'react-spinners';
import { UserState } from "../../context/UserProvider";

function EditEmployees() {
  const [employeePositions, setEmployeePositions] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [employees, setEmployees] = useState({
    name: '',
    employee_position_id: ''
  });
  const { setNotif } = UserState();

  const { id } = useParams();
  const navigate = useNavigate();

  // Get Employee Positions for select option
  useEffect(() => {
    const getEmployeePositions = async () => {
      try {
        const res = await fetchClient.get('/api/employee-positions?per_page=999')
        setEmployeePositions(res.data.data)
      } catch (err) {
        console.error(err);
      }
    }
    getEmployeePositions()
  }, []);

  // Retrieve selected employee data
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await fetchClient.get(`/api/employees/${id}`)
        setEmployees(res.data.data)
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false)
    }
    getEmployees()
  }, [id]);

  // Update value input state
  const handleInput = (e) => {
    e.persist();
    let value = e.target.value;
    setEmployees({ ...employees, [e.target.name]: value });
  }

  // Update Employee
  const updateEmployee = async (e) => {
    e.preventDefault();
    setUpdateIsLoading(true);
    try {
      const res = await fetchClient.put(`api/employees/${id}`, employees);
      setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
      navigate('/employees');
    } catch (err) {
      console.error(err);
      setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
    }
    setUpdateIsLoading(false);
  }

  return (
    <div className="min-h-96">
      {isLoading ? <Loading size='xl' /> : <div>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
          onSubmit={updateEmployee}
        >
          <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit Employee</h4>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
              Name
            </label>
            <TextInput
              value={employees?.name}
              id="name"
              name="name"
              className="w-full"
              onChange={(e) => setEmployees({ ...employees, name: e.target.value })}
            />
            <label htmlFor="position" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
              Positions
            </label>
            <Select name="employee_position_id" id="position" className='w-full' onChange={handleInput}>
              {employeePositions.map(p => (
                <option value={p.id} selected={employees.employee_position_id === p.id && 'selected'}>{p.name}</option>
              ))}
            </Select>
          </div>
          <div className="flex justify-end">
            <Button
              as={Link}
              color="failure"
              to='/employees'
              className="mr-2"
            >
              Cancel
            </Button>
            {updateIsLoading
              ? <Button
                type="submit"
                disabled
              >
                <BeatLoader color="white" size={6} className='my-1 mx-2' />
              </Button>
              : <Button
                type="submit"
              >
                Save
              </Button>}
          </div>
        </form>
      </div>}
    </div>
  )
}

export default EditEmployees;