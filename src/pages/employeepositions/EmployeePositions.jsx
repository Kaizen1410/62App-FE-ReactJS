import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import fetchClient from '../../utils/fetchClient';
import { Button, Dropdown, Table } from 'flowbite-react';
import Pagination from '../../components/Pagination';
import PopUpModal from '../../components/DeleteModal';
import { Link } from 'react-router-dom';
import { UserState } from '../../context/UserProvider';
import PerPage from '../../components/PerPage';
import SearchInput from '../../components/SearchInput';
import NoData from '../../components/NoData';

function EmployeePositions() {
  const [positions, setPositions] = useState([]);
  const [pagination, setPagination] = useState();
  const [openModal, setOpenModal] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState();
  const { setNotif } = UserState();

  // Loading State
  const [isLoading, setIsLoading] = useState(true);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  // Query Params
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    getEmployeePositions();
    // eslint-disable-next-line
  }, [search, page, sort, direction, perPage]);

  // Retrive Employee Positions data
  const getEmployeePositions = () => {
    setIsLoading(true);
    fetchClient.get(`/api/employee-positions?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`)
      .then(res => {
        setPositions(res.data.data);
        delete res.data.data
        setPagination(res.data);
      })
      .catch(error => {
        console.error('Error fetching employee positions:', error);
      })
      .finally(() => setIsLoading(false));
  }

  // Delete Employee Position
  const handleDeletePosition = (positionId) => {
    setDeleteIsLoading(true);
    fetchClient.delete(`/api/employee-positions/${positionId}`)
      .then(res => {
        getEmployeePositions()
        setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
        setOpenModal(null);
      })
      .catch((err) => {
        console.error('Error deleting employee position:', err);
        setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
      })
      .finally(() => setDeleteIsLoading(false));
  };

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
        <h1 className="text-2xl font-bold mb-8 dark:text-white">Employee Positions List</h1>
        <div className="flex flex-wrap gap-2 justify-between mb-4">
          <div className="flex gap-2">
            <Dropdown label="Sort By">
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('name')}>
                {sort === 'name' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Position
              </Dropdown.Item>
            </Dropdown>
            <SearchInput setSearch={setSearch} />
          </div>

          <Button as={Link} to="/employee-positions/add">
            Add Position
          </Button>
        </div>

        <div className='overflow-x-auto'>
          {isLoading ? <Loading size='xl' /> : (
            <Table striped>
              <Table.Head className='text-center sticky top-0'>
                <Table.HeadCell className='w-1'>No</Table.HeadCell>
                <Table.HeadCell>
                  Positions
                </Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {positions.length > 0 ? positions.map((position, i) => (
                  <Table.Row key={position.id}>
                    <Table.Cell className='text-center'>
                      {(i + 1) + pagination?.per_page * (page - 1)}
                    </Table.Cell>
                    <Table.Cell>
                      {position.name}
                    </Table.Cell>
                    <Table.Cell className='text-center'>
                      <Link
                        to={`/employee-positions/${position.id}/edit`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-600 mr-5"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => { setSelectedPosition(position.id); setOpenModal('pop-up') }}
                        className="font-medium text-red-600 hover:underline dark:text-red-600"
                      >
                        Delete
                      </button>
                    </Table.Cell>
                  </Table.Row>
                )) : (
                  <Table.Row >
                  <Table.Cell colSpan={10}>
                    <NoData/>
                  </Table.Cell>
                </Table.Row>)}
              </Table.Body>
            </Table>
          )}
        </div>

        <PerPage setPerPage={setPerPage} />

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeletePosition(selectedPosition)} isLoading={deleteIsLoading} />
    </>
  );
}

export default EmployeePositions;
