import { Avatar, Button, Select, TextInput } from "flowbite-react"
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { BeatLoader } from 'react-spinners';
import { UserState } from "../../context/UserProvider";
import { oneEmployee, updateEmployee } from "../../api/ApiEmployee";
import { getEmployeePositions } from "../../api/ApiEmployeePosition";
import initialName from "../../utils/initialName";

function EditEmployee() {
  const [employeePositions, setEmployeePositions] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [employee, setEmployee] = useState({
    name: '',
    profile_url: '',
    employee_position_id: ''
  });
  const [newImage, setNewImage] = useState();
  const { user, setUser, setNotif } = UserState();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get Employee Positions for select option and selected employee data
    const getRequiredData = async () => {
      setIsLoading(true);
      const employeePositionsData = getEmployeePositions();
      const employeeData = oneEmployee(id);

      const [employeePositions, employee] = await Promise.all([employeePositionsData, employeeData]);
      if(employeePositions.error || employee.error) {
        console.error(employeePositions.error);
        console.error(employee.error);
      } else {
        setEmployeePositions(employeePositions.data);
        setEmployee(employee.data);
      }
      setIsLoading(false);
    }
    getRequiredData();
  }, [id]);

  // Update value input state
  const handleInput = (e) => {
    e.persist();
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  // Update Employee
  const _updateEmployee = async (e) => {
    e.preventDefault();
    setUpdateIsLoading(true);

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', employee.name);
    formData.append('employee_position_id', employee.employee_position_id);

    if (newImage) {
      formData.append('profile_url', newImage);
    }

    const { data, error, message } = await updateEmployee(id, formData);
    if(error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setNotif(prev => [...prev, { type: 'success', message }]);

      if(user?.employee.id.toString() === id) {
        setUser(prev => ({...prev, employee: data}))
      }
      navigate('/employees');
    }
    setUpdateIsLoading(false);
  }

  const avatarTheme = {
    "root": {
      "img": {
        "base": "rounded object-cover"
      }
    }
  }

  return (
    isLoading ? <Loading size='xl' /> :
      <form
        className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
        onSubmit={_updateEmployee}
      >
        <h4 className="text-xl font-semibold text-center dark:text-gray-50 mb-5">Edit Employee</h4>
        <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
            Profile Image
          </label>
          <label className="cursor-pointer">
              <Avatar theme={avatarTheme}
                className='mx-auto object-cover'
                placeholderInitials={initialName(employee?.name)}
                img={newImage ? URL.createObjectURL(newImage) : employee?.profile_url}
                size="lg"
                rounded/>
            <input id="image" type="file" hidden onChange={(e) => setNewImage(e.target.files[0])} />
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
          />
          <label htmlFor="position" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
            Positions
          </label>
          <Select name="employee_position_id" id="position" className='w-full' value={employee?.employee_position_id} onChange={handleInput}>
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
  )
}

export default EditEmployee;