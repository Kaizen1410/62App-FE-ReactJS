import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import fetchClient from '../../utils/fetchClient';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchClient.get(`/api/employees?page=${page}&search=${search}`).then(res => {
      console.log(res)
      setEmployees(res.data.data);
      setPagination(res.data);
    })
    .catch(err => console.error(err))
    .finally(() => setTimeout(()=>{setIsLoading(false)}, 500));

  }, [page, search])

  const deleteEmployees = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    fetchClient.delete(`/api/employees/${id}`)
        .then(res => {
            alert(res.data.message);
            thisClicked.innerText = "Delete";
            fetchClient.get(`/api/employees?page=${page}&search=${search}`).then(res => {
                console.log(res)
                setEmployees(res.data.data);
                setPagination(res.data);
            });
        });
}

  const handlePage = (p) => {
    if (p === '&laquo; Previous' || p === 'Next &raquo;') {
      setPage(prev => p === '&laquo; Previous' ? prev - 1 : prev + 1);
      return;
    }
    setPage(p);
  }

  var employeesDetails = '';
  employeesDetails = employees.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.employee_position.name}</td>
        <td className='flex justify-center gap-10'>
          <Link to={`/employees/${item.id}/edit`} className="btn text-cyan-400">Edit</Link>
          <button type="button" onClick={(e) => deleteEmployees(e, item.id)} className="btn text-red-600">Delete</button>
        </td>
      </tr>
    )
  })

  const Filter = (event) => {
    setSearch(event.target.value)
  }

  return (
      <div className="container mt-5 p-3 mb-2">
        <div className="row">
          <div className="col-start-12">
            <div className="card border-0">
              <div className="card-title text-cyan-950 bg-cyan-400 flex justify-between p-3">
                <h4>Employee List</h4>
                <Link to={`/employees/add`} className="btn btn-cyan-950  text-cyan-400">Add Employee</Link>
              </div>
              <div className="card-body bg-cyan-400">
                <input type="text" className="form-control mb-3 float-end bg-cyan-950 border-0 text-cyan-400" onChange={Filter} placeholder="Search" />
                {isLoading ? <Loading /> : <table className="table-fixed hover:table-fixed">
                  <thead>
                    <tr className='text-cyan-950'>
                      <th>Name</th>
                      <th>Employee Position</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-cyan-950'>
                    {employeesDetails}
                  </tbody>
                </table>}
                {pagination?.links.length > 0 && (
                  <nav aria-label="Page navigation example">
                    <ul className="pagination flex justify-center">
                      {pagination?.links.map((item, i) => (
                        <li key={i} className={`page-item`}>
                          <button onClick={() => handlePage(item.label)} style={{ fontSize: '14px', width: '35px', height: '35px' }} className={`bg-cyan-400 ${item.active ? 'bg-cyan-950 text-cyan-400' : 'text-cyan-950'} rounded-circle  border-0`}>{`${item.label === '&laquo; Previous' ? '<' : item.label === 'Next &raquo;' ? '>' : item.label}`}</button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Employees;
