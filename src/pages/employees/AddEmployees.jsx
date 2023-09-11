import {useState} from 'react'

const AddEmployees = () => {
    const initialEmployee = { id: null, name: '', position: '' };
    const [employees, setEmployees] = useState([]);
    const [currentEmployee, setCurrentEmployee] = useState(initialEmployee);
    const [editing, setEditing] = useState(false);
  
    // Fungsi untuk menambahkan karyawan
    const addEmployee = (employee) => {
      employee.id = employees.length + 1;
      setEmployees([...employees, employee]);
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">Add Employee</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editing) {
              addEmployee(currentEmployee);
            }
            setCurrentEmployee(initialEmployee);
          }}
          className="max-w-md mx-auto p-4 bg-cyan-400 shadow-md rounded-md"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentEmployee.name}
              onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
              className="rounded-md py-2 px-3 text-cyan-400 bg-cyan-950 focus:outline-none focus:ring border-0 w-full"
              placeholder='Enter Name'
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-cyan-950 font-bold mb-2">
              Position
            <select name="position" id="position" className='rounded-md py-2 px-3 text-cyan-400 bg-cyan-950 focus:outline-none focus:ring w-full'>
              <option value="">Junior Developer</option>
              <option value="">Senior Developer</option>
              <option value="">Junior Project Manager</option>
              <option value="">Senior Project Manager</option>
              <option value="">Junior Quality Assurance</option>
              <option value="">Senior Quality Assurance</option>
              <option value="">Junior Design</option>
              <option value="">Senior Design</option>
            </select>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setCurrentEmployee(initialEmployee);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              {editing ? 'Simpan' : 'Add Employee'}
            </button>
          </div>
        </form>
  
      </div>
    )
}

export default AddEmployees