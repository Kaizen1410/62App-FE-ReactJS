import { Button } from "flowbite-react"
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";


function EditEmployees() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [employeePositions, setEmployeePositions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [employees, setEmployees] = useState({
    name: '',
    employee_position_id: ''
  });

  useEffect(() => {
    const getEmployeePositions = async () => {
      try {
        const res = await fetchClient.get('/api/employee-positions')
        setEmployeePositions(res.data.data)
      } catch (err) {
        console.error(err);
      }
    }
    getEmployeePositions()
  }, [])

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

  const handleInput = (e) => {
    e.persist();
    let value = e.target.value;
    setEmployees({ ...employees, [e.target.name]: value });
  }

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      await fetchClient.put(`api/employees/${id}`, employees);
      navigate('/employees');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="h-screen">
      <div className="text-cyan-950 flex justify-between p-3 xt-">
        <Button as={Link} to="/employees">
          <i className="fa-solid fa-angle-left"></i>
        </Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <div>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md dark:bg-gray-800 rounded-md"
          onSubmit={updateEmployee}
        >
          <h4 className="text-xl font-semibold text-center dark:text-gray-50">Edit Employee</h4>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-50 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={employees?.name}
              id="name"
              name="name"
              className="border rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
              onChange={(e) => setEmployees({ ...employees, name: e.target.value })}
            />
            <label htmlFor="position" className="block text-gray-700 dark:text-gray-50 font-bold mb-2 mt-5">
              Positions
              <select name="employee_position_id" id="position" className='rounded-md py-1 px-2 text-gray-700 w-full' onChange={handleInput}>
                {employeePositions.map(p => (
                  <option value={p.id} selected={employees.employee_position_id === p.id && 'selected'}>{p.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-end">
            <Link
              to='/employees'
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>}
    </div>
  )
}

export default EditEmployees;