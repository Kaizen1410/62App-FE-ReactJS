import { Table, Button, Dropdown } from "flowbite-react"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import PopUpModal from "../../components/DeleteModal";
import fetchClient from "../../utils/fetchClient";
import Pagination from "../../components/Pagination";
import { UserState } from "../../context/UserProvider";
import PerPage from "../../components/PerPage";
import SearchInput from "../../components/SearchInput";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState();

  // Query Params
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { setNotif } = UserState();

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line
  }, [search, page, sort, direction, perPage])

  // Retrieve roles data
  const getRoles = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get(`/api/roles?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
      setRoles(res.data.data);
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  // Delete Role
  const deleteRole = async (id) => {
    setDeleteIsLoading(true);
    try {
      const res = await fetchClient.delete(`api/roles/${id}`);
      setOpenModal(null);
      setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
      getRoles();
    } catch (err) {
      console.error(err);
      setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
    }
    setDeleteIsLoading(false);
  }

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
        <h1 className="font-bold text-2xl mb-8 dark:text-white">Roles List</h1>
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Dropdown label="Sort By">
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('name')}>
                {sort === 'name' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Roles
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('users_count')}>
                {sort === 'users_count' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Members
              </Dropdown.Item>
            </Dropdown>
            <SearchInput setSearch={setSearch} />
          </div>

          <Button as={Link} to="/roles/add">
            Add Role
          </Button>
        </div>

        <div>
          {isLoading ? <Loading size='xl' /> : (
            <Table striped>
              <Table.Head className="text-center sticky top-0">
                <Table.HeadCell className="w-1">No</Table.HeadCell>
                <Table.HeadCell>
                  Roles
                </Table.HeadCell>
                <Table.HeadCell>
                  Members
                </Table.HeadCell>
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

        <PerPage setPerPage={setPerPage} />

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => deleteRole(selectedRoles)} isLoading={deleteIsLoading} />
    </>
  );
}
export default Roles