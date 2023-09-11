import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Layout from '../../components/Layout';

const Employees = () => {

  const [employee, setEmployee] = useState([]);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/api/employees?page=${page}&search=${search}`).then(res => {
      console.log(res)
      setEmployee(res.data.data);
      setPagination(res.data);
    });

  }, [page, search])

  const handlePage = (p) => {
    if (p === '&laquo; Previous' || p === 'Next &raquo;') {
      setPage(prev => p === '&laquo; Previous' ? prev - 1 : prev + 1);
      return;
    }
    setPage(p);
  }

  var employeesDetails = '';
  employeesDetails = employee.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.employee_position.name}</td>
        <td>
          <Link to={`/employees/${item.id}/edit`} className="btn btn-cyan-400 text-cyan-400">Edit</Link>
        </td>
      </tr>
    )
  })

  const Filter = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>Employees</div>
  )
}

export default Employees;
