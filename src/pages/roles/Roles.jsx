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
      setOpenModal(null);
      getAllRoles()
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="font-bold text-2xl mb-8 dark:text-white">Roles List</h1>
        <div className="relative flex justify-between mb-6">
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
          <input
            type="search"
            className="w-56 pl-8 rounded-md"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button as={Link} to="/roles/add">
            Add Role
          </Button>
        </div>
        
        <div className="h-96 overflow-y-auto">
          {isLoading ? <Loading size='xl' /> : (
            <Table striped>
              <Table.Head className="text-center sticky top-0">
                <Table.HeadCell className="w-1">No</Table.HeadCell>
                <Table.HeadCell>Roles</Table.HeadCell>
                <Table.HeadCell>Members</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {roles.map((role, i) => (
                  <Table.Row key={i}>
                    <Table.Cell className="text-center">
                      {(i + 1) + pagination?.per_page * (page - 1)}
                    </Table.Cell>
                    <Table.Cell>
                      {role.name}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {role.users_count}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <Link
                        to={`/roles/${role.id}/edit`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => { setSelectedRoles(role.id); setOpenModal('pop-up') }}
                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        Delete
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>)}
        </div>

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => deleteRole(selectedRoles)} />
    </>
  );
}
export default Roles