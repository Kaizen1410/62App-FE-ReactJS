import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import fetchClient from '../../utils/fetchClient';
import { Table, Button, Dropdown, Avatar } from "flowbite-react";
import PopUpModal from "../../components/DeleteModal";
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import { UserState } from '../../context/UserProvider';
import PerPage from '../../components/PerPage';
import SearchInput from '../../components/SearchInput';
import initialName from '../../utils/initialName';
import NoData from '../../components/NoData';

const Employees = () => {

  const [openModal, setOpenModal] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(1);

  // Query Params
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');
  const [perPage, setPerPage] = useState(10);

  const { setNotif } = UserState();

  useEffect(() => {
    getAllEmployee();
    // eslint-disable-next-line
  }, [search, page, sort, direction, perPage])

  // Retrieve Employees data
  const getAllEmployee = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get(`/api/employees?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
      setEmployees(res.data.data);
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  // Delete Employee
  const handleDeleteEmployee = (employeesId) => {
    setDeleteIsLoading(true);
    fetchClient.delete(`/api/employees/${employeesId}`)
      .then(res => {
        setOpenModal(null);
        setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
        getAllEmployee()
      })
      .catch((err) => {
        console.error('Error deleting employee position:', err);
        setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
      })
      .finally(() => setDeleteIsLoading(false));
  }

  // Sort
  const handleSort = (field) => {
    if (field === sort) {
      setDirection(prev => prev === 'asc' ? 'desc' : 'asc');
      return;
    }

    setSort(field);
    setDirection('asc');
  }

  return (
    <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="font-bold dark:text-white text-2xl mb-8"> Employees List</h1>
        <div className="flex flex-wrap gap-2 justify-between mb-4">
          <div className="flex gap-2">
            <Dropdown label="Sort By">
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('name')}>
                {sort === 'name' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Name
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('employee_position')}>
                {sort === 'employee_position' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Position
              </Dropdown.Item>
            </Dropdown>
            <SearchInput setSearch={setSearch} />
          </div>
          <Button as={Link} to="/employees/add">
            Add Employee
          </Button>
        </div>

        <div className='overflow-x-auto'>
          {isLoading ? <Loading size='xl' /> : <Table striped>
            <Table.Head className='text-center sticky top-0'>
              <Table.HeadCell className="w-1">No</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Profile Image</Table.HeadCell>
              <Table.HeadCell>Position</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {employees.length > 0 ? employees.map((employee, i) => (
                <Table.Row key={employee.id}>
                  <Table.Cell className="text-center">
                    {(i + 1) + pagination?.per_page * (page - 1)}
                  </Table.Cell>
                  <Table.Cell>{employee.name}</Table.Cell>
                  <Table.Cell className='text-center'>
                    {employee.profile_url
                    ? <img src={employee.profile_url} className='mx-auto h-20 aspect-square object-cover' alt="" />
                    : <Avatar className='mx-auto object-cover' size="lg" placeholderInitials={initialName(employee.name)} />}
                  </Table.Cell>
                  <Table.Cell className='text-center'>{employee.employee_position}</Table.Cell>
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
              )) : (
                <Table.Row >
                <Table.Cell colSpan={10}>
                  <NoData />
                </Table.Cell>
              </Table.Row>)}
            </Table.Body>
          </Table>}
        </div>

        <PerPage setPerPage={setPerPage} />

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeleteEmployee(selectedEmployee)} isLoading={deleteIsLoading} />
    </>
  );
}
export default Employees;
