import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeePositions() {
  const [positions, setPositions] = useState();
  const [newPosition, setNewPosition] = useState('');
  const [editingPosition, setEditingPosition] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Mengambil data posisi karyawan dari API backend
    axios.get(`/api/employee-positions?search=${search}&page=${page}`)
      .then((res) => {
        setPositions(res.data);
      })
      .catch((error) => {
        console.error('Error fetching employee positions:', error);
      });
  }, [search, page]);

  const handleAddPosition = (e) => {
    e.preventDefault();
    // Mengirim data posisi baru ke server
    axios.post('/api/employee-positions', { name: newPosition })
      .then((response) => {
        setPositions([...positions, response.data.data]);
        setNewPosition('');
      })
      .catch((error) => {
        console.error('Error adding employee position:', error);
      });
  };

  const handleEditPosition = (position) => {
    // Menyimpan ID posisi yang akan diedit
    setEditingPosition(position.id);
  };

  const handleSavePosition = (position) => {
    // Mengirim data posisi yang diedit ke server
    axios.put(`/api/employee_positions/${position.id}`, { name: position.name })
      .then(() => {
        setEditingPosition(null);
      })
      .catch((error) => {
        console.error('Error editing employee position:', error);
      });
  };

  const handleCancelEdit = () => {
    // Membatalkan mode edit
    setEditingPosition(null);
  };

  const handleDeletePosition = (positionId) => {
    // Menghapus posisi dari server dan daftar posisi
    axios.delete(`/api/employee_positions/${positionId}`)
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">List Employee Positions</h1>

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

      <div>
        <input type="search" className='w-full' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">No</th>
            <th className="p-2">Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {positions?.data.map((position, i) => (
            <tr key={position.id}>
              <td className="border p-2">{(i + 1) + positions.per_page * (page - 1)}</td>
              <td className="border p-2">
                {editingPosition === position.id ? (
                  <input
                    type="text"
                    value={position.name}
                    onChange={(e) => {
                      const updatedPosition = { ...position, name: e.target.value };
                      handleSavePosition(updatedPosition);
                    }}
                    className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                ) : (
                  position.name
                )}
              </td>
              <td className="border p-2">
                {editingPosition === position.id ? (
                  <>
                    <button
                      onClick={() => handleSavePosition(position)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md mr-2"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditPosition(position)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {positions?.links.length > 0 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination flex justify-center">
            {positions?.links.map((item, i) => (
              <li key={i} className={`page-item`}>
                <button onClick={() => handlePage(item.label)} style={{ fontSize: '14px', width: '35px', height: '35px' }} className={`bg-cyan-400 ${item.active ? 'bg-cyan-950 text-cyan-400' : 'text-cyan-950'} rounded-circle  border-0`}>{`${item.label === '&laquo; Previous' ? '<' : item.label === 'Next &raquo;' ? '>' : item.label}`}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default EmployeePositions;
