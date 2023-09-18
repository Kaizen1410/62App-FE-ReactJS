import { Avatar, Button, Select, TextInput } from "flowbite-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";
import { BeatLoader } from 'react-spinners';
import { UserState } from "../../context/UserProvider";

function AddEmployee() {
  const [isLoading, setIsLoading] = useState(true);
  const [addIsLoading, setAddIsLoading] = useState(false);
  const [employeePositions, setEmployeePositions] = useState([]);
  const [employee, setEmployee] = useState({
    name: '',
    profile_url: '',
    employee_position_id: ''
  });
  const { setNotif } = UserState();

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
      setIsLoading(false)
    }
    getEmployeePositions()
  }, [])

  // Update value input state
  const handleInput = (e) => {
    e.persist();
    let value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  }

  // Add Employee
  const saveEmployee = (e) => {
    setAddIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('employee_position_id', employee.employee_position_id);

    if (employee.profile_url) {
      formData.append('profile_url', employee.profile_url);
    }

    fetchClient.post('/api/employees', formData, { headers: { "Content-Type": 'multipart/form-data' } })
      .then(res => {
        setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
        navigate('/employees');
      })
      .catch(err => {
        console.error(err);
        setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
      })
      .finally(() => setAddIsLoading(false));
  }


  return (
    isLoading ? <Loading size='xl' /> :
      <form
        className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-md"
        onSubmit={saveEmployee}
      >
        <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Add Employee</h4>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
            Profile Image
          </label>
          <label className="cursor-pointer">
            {employee.profile_url
              ? <img src={employee?.profile_url && URL.createObjectURL(employee?.profile_url)} className='rounded-full mx-auto h-20 aspect-square object-cover' alt="" />
              : <Avatar className='mx-auto object-cover' size="lg" rounded/>}
            <input type="file" hidden onChange={(e) => setEmployee({ ...employee, profile_url: e.target.files[0] })} />
          </label>

          <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
            Name
          </label>
          <TextInput
            value={employee?.name}
            id="name"
            name="name"
            className="w-full"
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            placeholder="Enter Name"
          />

          <label htmlFor="position" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
            Positions
          </label>
          <Select name="employee_position_id" id="position" value={employee.employee_position_id} className='w-full' onChange={handleInput}>
            <option value=''>---Select Position---</option>
            {employeePositions.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
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
          {addIsLoading
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
  )
}

export default AddEmployee;