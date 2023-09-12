import { Button } from "flowbite-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";
import Loading from "../../components/Loading";

function AddEmployees() {

  const [isLoading, setIsLoading] = useState(true)
  const [employeePositions, setEmployeePositions] = useState([])
  const navigate = useNavigate()
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
      setIsLoading(false)
    }
    getEmployeePositions()
  }, [])


  const handleInput = (e) => {
    e.persist();
    console.log({ [e.target.name]: e.target.value })
    let value = e.target.value;
    setEmployees({ ...employees, [e.target.name]: value });
  }

  const saveEmployees = (e) => {
    e.preventDefault();

    const data = {
      name: employees.name,
      employee_position_id: employees.employee_position_id
    }

    fetchClient.post('/api/employees', data)
      .then(res => {
        navigate('/employees')
      })
      .catch(err => console.error(err));
  }
  

  return (
    
    <>
      <div className="text-cyan-950 flex justify-between p-3 xt-">
        <Button as={Link} to="/employees">
          <i className="fa-solid fa-angle-left"></i>
        </Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <div>
        <form
          className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
          onSubmit={saveEmployees}
        >
          <h4 className="text-xl font-semibold text-center">Add Employee</h4>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
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
            <label htmlFor="position" className="block text-gray-700 font-bold mb-2 mt-5">
              Positions
              <select name="employee_position_id" id="position" className='rounded-md py-1 px-2 text-gray-700 w-full' onChange={handleInput}>
              <option value='' selected>Select Position</option>
                {employeePositions.map(p => (
                  <option value={p.id}>{p.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-end">
            <Link
              to='/employees'
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>}
    </>
  )
}

export default AddEmployees;