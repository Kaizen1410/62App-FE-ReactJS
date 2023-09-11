import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeePositions() {
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState('');
  const [editingPosition, setEditingPosition] = useState(null);

  useEffect(() => {
    // Mengambil data posisi karyawan dari API backend
    axios.get('/api/employee_positions')
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee positions:', error);
      });
  }, []);

  const handleAddPosition = () => {
    // Mengirim data posisi baru ke server
    axios.post('/api/employee_positions', { name: newPosition })
      .then((response) => {
        setPositions([...positions, response.data]);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">List Employee Positions</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
          className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-2/3"
          placeholder="Add New Position"
        />
        <button
          onClick={handleAddPosition}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
        >
          Add
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">No</th>
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id}>
              <td className="border p-2">{position.id}</td>
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
    </div>
  );
}

export default EmployeePositions;
