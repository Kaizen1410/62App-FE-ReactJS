import { useState } from 'react';

const AddLeave = () => {

    const initialLeaves = { id: null, name: '', position: '' };
    const [leave, setLeave] = useState([]);
    const [currentLeaves, setCurrentLeaves] = useState(initialLeaves);
    const [editing, setEditing] = useState(false);
  
    // Fungsi untuk menambahkan karyawan
    const addLeaves = (leaves) => {
      leaves.id = leave.length + 1;
      setLeave([...leave, leaves]);
    };
  
    // Fungsi untuk mengedit karyawan
    const editLeaves = (id, updatedLeaves) => {
      setEditing(false);
      setLeave(leave.map((leaves) => (leaves.id === id ? updatedLeaves : leaves)));
    };
  
    // Fungsi untuk menghapus karyawan
    const deleteLeave = (id) => {
      setLeave(leave.filter((leaves) => leaves.id !== id));
    };
  
    // Fungsi untuk mengisi formulir edit dengan data karyawan
    const editForm = (leaves) => {
      setEditing(true);
      setCurrentLeaves({ id: leaves.id, name: leaves.name, position: leaves.position });
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Daftar Karyawan</h1>
  
        {/* Formulir Tambah/Edit */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editing) {
              editLeaves(currentLeaves.id, currentLeaves);
            } else {
              addLeaves(currentLeaves);
            }
            setCurrentLeaves(initialLeaves);
          }}
          className="max-w-md mx-auto p-4 bg-cyan-400 shadow-md rounded-md"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentLeaves.name}
              onChange={(e) => setCurrentLeaves({ ...currentLeaves, name: e.target.value })}
              className="rounded-md py-2 px-3 text-cyan-400 bg-cyan-950 focus:outline-none focus:ring border-0 w-full"
              placeholder='Enter Name'
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-cyan-950 font-bold mb-2">
              Posisi
            <select name="position" id="position" className='rounded-md py-5 px-3 text-cyan-400 focus:outline-none focus:ring  w-full'>
              <option value="">Junior Developer</option>
              <option value="">Senior Developer</option>
              <option value="">Junior Project Manager</option>
              <option value="">Senior Project Manager</option>
              <option value="">Junior Quality Assurance</option>
              <option value="">Senior Quality Assurance</option>
              <option value="">Junior Design</option>
              <option value="">Senior Design</option>
            </select>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setCurrentLeaves(initialLeaves);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-2"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              {editing ? 'Simpan' : 'Tambah Karyawan'}
            </button>
          </div>
        </form>
  
      </div>
    )
}

export default AddLeave