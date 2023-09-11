import React, {useState} from 'react';


function Employees() {
  const [employees, setEmployees] = useState([]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">List Employees</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">No</th>
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-2">{employee.id}</td>
              <td className="border p-2">{employee.name}</td>
              <td className="border p-2">{employee.position}</td>
              </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
}

export default Employees;
