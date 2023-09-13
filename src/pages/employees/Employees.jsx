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
  const [isLoading, setIsLoading] = useState(true);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(1);

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
    setDeleteIsLoading(true);
    fetchClient.delete(`/api/employees/${employeesId}`)
      .then(() => {
        setOpenModal(null);
        getAllEmployee()
      })
      .catch((error) => {
        console.error('Error deleting employee position:', error);
      })
      .finally(() => setDeleteIsLoading(false));
  };

  return (
    <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="font-bold dark:text-white text-2xl mb-8"> Employees List</h1>
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

        <div className="h-96 overflow-y-auto">
          {isLoading ? <Loading size='xl' /> : <Table striped>
            <Table.Head className='text-center sticky top-0'>
              <Table.HeadCell className="w-1">No</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Position</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {employees.map((employee, i) => (
                <Table.Row key={employee.id}>
                  <Table.Cell className="text-center">
                    {(i + 1) + pagination?.per_page * (page - 1)}
                  </Table.Cell>
                  <Table.Cell>{employee.name}</Table.Cell>
                  <Table.Cell>{employee.employee_position?.name}</Table.Cell>
                  <Table.Cell className='text-center'>
                    <Link
                      to={`/employees/${employee.id}/edit`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedEmployee(employee.id)
                        setOpenModal('pop-up')
                      }}
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>}
        </div>

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeleteEmployee(selectedEmployee)} isLoading={deleteIsLoading} />
    </>
  );
}
export default Employees;
