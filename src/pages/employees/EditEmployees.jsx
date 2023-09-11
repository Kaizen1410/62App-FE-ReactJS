import React, { useState } from 'react';

function EditEmployees() {
  const initialEmployee = { id: null, name: '', position: '' };
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(initialEmployee);
  const [editing, setEditing] = useState(false);

  // Fungsi untuk mengedit karyawan
  const editEmployee = (id, updatedEmployee) => {
    setEditing(false);
    setEmployees(employees.map((employee) => (employee.id === id ? updatedEmployee : employee)));
  };

  // Fungsi untuk menghapus karyawan
  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  // Fungsi untuk mengisi formulir edit dengan data karyawan
  const editForm = (employee) => {
    setEditing(true);
    setCurrentEmployee({ id: employee.id, name: employee.name, position: employee.position });
  };

  return (
    <div className="container mx-auto p-4">
      <div>
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">List Employees</h1>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">No</th>
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-2">{employee.id}</td>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.position}</td>
              <td className="border p-2">
                <button
                  onClick={() => editForm(employee)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditEmployees;
