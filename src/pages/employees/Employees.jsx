import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import fetchClient from '../../utils/fetchClient';
import { Table, Button } from "flowbite-react";
import PopUpModal from "../../components/DeleteModal";
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';

const Employees = () => {

  const [openModal, setOpenModal] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEmployee, setSelectedEmployee] = useState(1)

  useEffect(() => {
    getAllEmployee();
  }, [search, page])

  const getAllEmployee = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get(`/api/employees?search=${search}&page=${page}`);
      setEmployees(res.data.data);
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  const handleDeleteEmployee = (employeesId) => {
    console.log(employeesId)
    fetchClient.delete(`/api/employees/${employeesId}`)
      .then(res => {
        console.log(res.data)
        setEmployees(employees.filter((employees) => employees.id !== employeesId));
        setOpenModal(null);
      })
      .catch((error) => {
        console.error('Error deleting employee position:', error);
      });
  };

  const handlePage = (p) => {
    if (p === '&laquo; Previous' || p === 'Next &raquo;') {
      setPage(prev => p === '&laquo; Previous' ? prev - 1 : prev + 1);
      return;
    }
    setPage(p);
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

        <Button as={Link} to="/employees/add">
          Add Employee
        </Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <Table striped>
        <Table.Head className='text-center'>
          <Table.HeadCell className="w-1">No</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {employees.map((e, i) => (
            <Table.Row key={e.id}>
              <Table.Cell className="text-center">
                {(i + 1) + pagination?.per_page * (page - 1)}
              </Table.Cell>
              <Table.Cell>{e.name}</Table.Cell>
              <Table.Cell>{e.employee_position?.name}</Table.Cell>
              <Table.Cell className='text-center'>
                <Link
                  to={`/employees/${e.id}/edit`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    setSelectedEmployee(e.id)
                    setOpenModal('pop-up')}}
                  className="font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>}

      <Pagination pagination={pagination} page={page} setPage={setPage} />

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeleteEmployee(selectedEmployee)} />
    </div>
  );
}
export default Employees;
