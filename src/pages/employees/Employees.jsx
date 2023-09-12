import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import fetchClient from '../../utils/fetchClient';
import { Table, Button } from "flowbite-react";
import PopUpModal from "../../components/DeleteModal";

const Employees = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [openModal, setOpenModal] = useState(null);
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
    <div className="mx-auto p-4">
    <h1 className="text-center font-bold text-white text-2xl mb-8"> Employees List</h1>

    <div className="relative flex justify-between mb-4">
      <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
      <input
        type="search"
        className="w-56 pl-8 rounded-md"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button as={Link} to="/employess/add">
        Add
      </Button>
    </div>
      <Table striped>
        <Table.Head>
          <Table.HeadCell className="w-1">No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {userRoles.map((u, i) => (
            <Table.Row key={u.id}>
              <Table.Cell className="text-center">
                {(i + 1) + pagination?.per_page * (page - 1)}
              </Table.Cell>
              <Table.Cell>{u.email}</Table.Cell>
              <Table.Cell>{u.employee.name}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-1">
                  {u.roles.map((r, j) => (
                    <span key={j} className="border px-2 py-1 rounded-md">
                      {r.name}
                    </span>
                  ))}
                </div>
              </Table.Cell>
              <Table.Cell>
                <Link
                  to={`/employees/${u.id}/edit`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setOpenModal('pop-up')}
                  className="font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
   

    {pagination?.links.length > 0 && (
      <div className="flex justify-center items-center gap-1 mt-12">
        {pagination?.links.map((l, i) => (
          <button
            key={i}
            className={`py-1 rounded-full w-8 h-8 text-center ${
              l.label === page.toString()
                ? 'bg-white text-black '
                : 'text-white'
            } ${l.url ? 'cursor-pointer hover:bg-slate-400 hover:text-black' : 'cursor-not-allowed text-gray-400'}`}
            onClick={() => (l.label)}
            disabled={!l.url}
          >
            {l.label === '&laquo; Previous' ? '<' : l.label === 'Next &raquo;' ? '>' : l.label}
          </button>
        ))}
      </div>
    )}

    <PopUpModal openModal={openModal} setOpenModal={setOpenModal} />
  </div>
);
}
export default Employees;
