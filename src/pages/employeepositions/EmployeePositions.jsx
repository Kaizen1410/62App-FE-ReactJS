import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeePositions() {
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState('');
  const [editingPosition, setEditingPosition] = useState(null);
  const [pagination, setPagination] = useState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getEmployeePositions();
  }, [search, page]);
  
  // Mengambil data posisi karyawan dari API backend
  const getEmployeePositions = () => {
    axios.get(`/api/employee-positions?search=${search}&page=${page}`)
    .then(res => {
      setPositions(res.data.data);
      delete res.data.data
      setPagination(res.data);
    })
    .catch(error => {
      console.error('Error fetching employee positions:', error);
    });
  }

  const handleAddPosition = (e) => {
    e.preventDefault();
    // Mengirim data posisi baru ke server
    axios.post('/api/employee-positions', { name: newPosition })
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
    axios.put(`/api/employee-positions/${editingPosition.id}`, { name: editingPosition.name })
      .then(() => {
        const updated = positions.map(p => {
          if (p.id===editingPosition.id) {
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
    axios.delete(`/api/employee-positions/${positionId}`)
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

      <input type="search" className='w-full rounded-md mb-4' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">No</th>
            <th className="p-2">Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position, i) => (
            <tr key={position.id}>
              <td className="border p-2">{(i + 1) + pagination?.per_page * (page - 1)}</td>
              <td className="border p-2">
                {editingPosition?.id === position.id ? (
                  <input
                    type="text"
                    value={editingPosition?.name}
                    onChange={(e) => {
                      setEditingPosition({ ...editingPosition, name: e.target.value });
                    }}
                    className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
                  />
                ) : (
                  position.name
                )}
              </td>
              <td className="border p-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
