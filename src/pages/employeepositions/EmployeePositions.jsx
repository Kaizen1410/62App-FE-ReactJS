import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import fetchClient from '../../utils/fetchClient';
import { Table } from 'flowbite-react';

function EmployeePositions() {
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState('');
  const [editingPosition, setEditingPosition] = useState(null);
  const [pagination, setPagination] = useState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
    // Menghapus posisi dari server dan daftar posisi
    fetchClient.delete(`/api/employee-positions/${positionId}`)
      .then(() => {
        setPositions(positions.filter((position) => position.id !== positionId));
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
      <h1 className="text-2xl font-bold mb-8 text-center text-white">List Employee Positions</h1>

      <form onSubmit={handleAddPosition} className="mb-4 flex">
        <input
          type="text"
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
          className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
          placeholder="Add New Position"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
        >
          Add
        </button>
      </form>

      <div className="relative mb-4">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
        <input type="search" className="w-full pl-8 rounded-md" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
      </div>

      {isLoading ? <Loading size='xl' /> : (
        <Table striped>
          <Table.Head>
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
                <Table.Cell>
                  {editingPosition?.id === position.id ? (
                    <>
                      <button
                        onClick={() => handleSavePosition()}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingPosition(null)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingPosition(position)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePosition(position.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {pagination?.links.length > 0 && (
        <div className='flex justify-center items-center gap-1 mt-12'>
          {pagination?.links.map((l, i) => (
            <button key={i} className={`py-1 rounded-full w-8 h-8 text-center ${l.label === page.toString() ? 'bg-white text-black ' : 'text-white'} ${l.url && 'cursor-pointer hover:bg-slate-400 hover:text-black'}`}
              onClick={() => handlePage(l.label)} disabled={!l.url && 'disabled'}>
              {(l.label === '&laquo; Previous' ? '<' : (l.label === 'Next &raquo;' ? '>' : l.label))}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeePositions;
