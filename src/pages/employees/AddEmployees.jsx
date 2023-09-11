import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../../utils/fetchClient";

function AddEmployees() {

  const [employees, setEmployees] = useState({
    name: '',
    employee_position_id: ''
  });

  const [employeePositions, setEmployeePositions] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const getEmployeePositions = () => {
      fetchClient.get('/api/employee-positions')
        .then(res => setEmployeePositions(res.data.data))
        .catch(err => console.error(err))
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
        alert(res.data.message);
        navigate('/employees')
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="container mt-5 p-3 mb-2">
      <div className="row">
        <div className="col-start-12">
          <div className="card border-0 bg-cyan-400">
            <div className="card-title text-cyan-950 bg-cyan-400 flex justify-between p-3">
              <h4>Add Employee</h4>
              <Link to="/employees" className="btn btn-light float-end">Back</Link>
            </div>
            <div className="card-body">
              <form onSubmit={saveEmployees}>
                <div className="mb-3">
                  <label className="text-cyan-950">Name</label>
                  <input type="text" name="name" value={employees.name} onChange={handleInput} className="form-control border-0 text-cyan-400 bg-cyan-950" placeholder="Enter Name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="position" className="block text-cyan-950  mb-2">
                    Positions
                    <select name="employee_position_id" id="position" className='rounded-md py-5 px-3 text-cyan-400 bg-cyan-950 focus:outline-none focus:ring  w-full' onChange={handleInput}>
                      <option value="">---Select Position---</option>
                      {employeePositions.map(p => (
                        <option value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn text-cyan-400">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployees;