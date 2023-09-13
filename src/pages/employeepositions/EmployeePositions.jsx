import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import fetchClient from '../../utils/fetchClient';
import { Button, Table } from 'flowbite-react';
import Pagination from '../../components/Pagination';
import PopUpModal from '../../components/DeleteModal';

function EmployeePositions() {
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState('');
  const [editingPosition, setEditingPosition] = useState(null);
  const [pagination, setPagination] = useState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState();

  useEffect(() => {
    getEmployeePositions();
  }, [search, page]);

  // Mengambil data posisi karyawan dari API backend
  const getEmployeePositions = () => {
    setIsLoading(true);
    fetchClient.get(`/api/employee-positions?search=${search}&page=${page}`)
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

  const handleAddPosition = (e) => {
    e.preventDefault();
    // Mengirim data posisi baru ke server
    fetchClient.post('/api/employee-positions', { name: newPosition })
      .then(() => {
        getEmployeePositions();
        setNewPosition('');
      })
      .catch(error => {
        console.error('Error adding employee position:', error);
      });
  };

  const handleSavePosition = () => {
    // Mengirim data posisi yang diedit ke server
    fetchClient.put(`/api/employee-positions/${editingPosition.id}`, { name: editingPosition.name })
      .then(() => {
        const updated = positions.map(p => {
          if (p.id === editingPosition.id) {
            p = editingPosition;
          }
          return p
        });
        setPositions(updated);
        setEditingPosition(null);
      })
      .catch((error) => {
        console.error('Error editing employee position:', error);
      });
  };

  const handleDeletePosition = (positionId) => {
    setDeleteIsLoading(true);
    // Menghapus posisi dari server dan daftar posisi
    fetchClient.delete(`/api/employee-positions/${positionId}`)
      .then(() => {
        getEmployeePositions()
        setOpenModal(null);
      })
      .catch((error) => {
        console.error('Error deleting employee position:', error);
      })
      .finally(() => setDeleteIsLoading(false));
  };

  return (
    <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">Employee Positions List</h1>

        <form onSubmit={handleAddPosition} className="mb-4 flex">
          <input
            type="text"
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
            className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
            placeholder="Add New Position"
          />
          <Button className='ml-3' type='submit'>
            Add
          </Button>
        </form>

        <div className="relative mb-4">
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
          <input type="search" className="w-full pl-8 rounded-md" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="h-96 overflow-y-auto">
          {isLoading ? <Loading size='xl' /> : (
            <Table striped>
              <Table.Head className='text-center sticky top-0'>
                <Table.HeadCell className='w-1'>No</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {positions.map((position, i) => (
                  <Table.Row key={position.id}>
                    <Table.Cell className='text-center'>
                      {(i + 1) + pagination?.per_page * (page - 1)}
                    </Table.Cell>
                    <Table.Cell>
                      {editingPosition?.id === position.id ? (
                        <input
                          type="text"
                          value={editingPosition?.name}
                          onChange={(e) => {
                            setEditingPosition({ ...editingPosition, name: e.target.value });
                          }}
                          className="border rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
                        />
                      ) : (
                        position.name
                      )}
                    </Table.Cell>
                    <Table.Cell className='text-center'>
                      {editingPosition?.id === position.id ? (
                        <>
                          <button
                            onClick={() => handleSavePosition()}
                            className="font-medium text-green-600 hover:underline dark:text-green-600 mr-5"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPosition(null)}
                            className="font-medium text-red-600 hover:underline dark:text-red-600 mr-5"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingPosition(position)}
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-600 mr-5"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => { setSelectedPosition(position.id); setOpenModal('pop-up') }}
                            className="font-medium text-red-600 hover:underline dark:text-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeletePosition(selectedPosition)} isLoading={deleteIsLoading} />
    </>
  );
}

export default EmployeePositions;
