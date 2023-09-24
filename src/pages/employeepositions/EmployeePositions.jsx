import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { Button, Table } from 'flowbite-react';
import Pagination from '../../components/Pagination';
import PopUpModal from '../../components/DeleteModal';
import { Link } from 'react-router-dom';
import { UserState } from '../../context/UserProvider';
import PerPage from '../../components/PerPage';
import SearchInput from '../../components/SearchInput';
import NoData from '../../components/NoData';
import { deleteEmployeePosition, getEmployeePositions } from '../../api/ApiEmployeePosition';
import SortBy from '../../components/SortBy';

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
    _getEmployeePositions();
    // eslint-disable-next-line
  }, [search, page, sort, direction, perPage]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // Retrive Employee Positions data
  const _getEmployeePositions = async () => {
    setIsLoading(true);
    const { data, pagination, error } = await getEmployeePositions(search, page, sort, direction, perPage);
    if (error) {
      console.error('Error fetching employee positions:', error);
    } else {
      setPositions(data);
      setPagination(pagination);
    }
    setIsLoading(false);
  }

  // Delete Employee Position
  const handleDeletePosition = async (positionId) => {
    setDeleteIsLoading(true);

    const { error, message } = await deleteEmployeePosition(positionId);
    if (error) {
      console.error('Error deleting employee position:', error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      _getEmployeePositions()
      setNotif(prev => [...prev, { type: 'success', message }]);
      setOpenModal(null);
    }
    setDeleteIsLoading(false);
  };

  const items = [
    {
      field: 'name',
      name: 'Position'
    },
  ]

  return (
    <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">Employee Positions List</h1>
        <div className="flex flex-wrap gap-2 justify-between mb-4">
          <div className="flex gap-2">
            <SortBy items={items} sort={sort} setSort={setSort} direction={direction} setDirection={setDirection} />

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
                      <NoData />
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
