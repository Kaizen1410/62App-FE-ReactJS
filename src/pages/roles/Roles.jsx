import { Table, Button } from "flowbite-react"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import PopUpModal from "../../components/DeleteModal";
import fetchClient from "../../utils/fetchClient";
import Pagination from "../../components/Pagination";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState();

  useEffect(() => {
    getAllRoles();
  }, [search, page])


  const getAllRoles = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get(`/api/roles?search=${search}&page=${page}`);
      setRoles(res.data.data);
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  const deleteRole = async (id) => {
    try {
      await fetchClient.delete(`api/roles/${id}`)
      setRoles(roles.filter((role) => role.id !== id));
      setOpenModal(null);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="mx-auto p-4">
      <h1 className="text-center font-bold text-white text-2xl mb-8">Roles</h1>

      <div className="relative flex justify-between mb-4">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
        <input
          type="search"
          className="w-56 pl-8 rounded-md"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button as={Link} to="/roles/add">
          Add
        </Button>
      </div>
        {isLoading ? <Loading size='xl' /> : (
        <Table striped>
          <Table.Head>
            <Table.HeadCell className="w-1">No</Table.HeadCell>
            <Table.HeadCell>Roles</Table.HeadCell>
            <Table.HeadCell>Members</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {roles.map((r, i) => (
              <Table.Row key={i}>
                <Table.Cell className="text-center">
                  {(i + 1) + pagination?.per_page * (page - 1)}
                </Table.Cell>
                <Table.Cell>{r.name}</Table.Cell>
                <Table.Cell>
                  {r.users_count}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/roles/${r.id}/edit`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {setSelectedRoles(r.id); setOpenModal('pop-up')}}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
            
          </Table.Body>
        </Table>)}

      <Pagination pagination={pagination} page={page} setPage={setPage} />

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => deleteRole(selectedRoles)} />
    </div>
  );
}
export default Roles