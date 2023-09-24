import { Table, Button } from "flowbite-react"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import PopUpModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { UserState } from "../../context/UserProvider";
import PerPage from "../../components/PerPage";
import SearchInput from "../../components/SearchInput";
import NoData from "../../components/NoData";
import { deleteRole, getRoles } from "../../api/ApiRole";
import SortBy from "../../components/SortBy";

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
    _getRoles();
    // eslint-disable-next-line
  }, [search, page, sort, direction, perPage]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // Retrieve roles data
  const _getRoles = async () => {
    setIsLoading(true);

    const { data, error, pagination } = await getRoles(search, page, sort, direction, perPage);
    if (error) {
      console.error(error);
    } else {
      setRoles(data);
      setPagination(pagination);
    }
    setIsLoading(false);
  }

  // Delete Role
  const _deleteRole = async (id) => {
    setDeleteIsLoading(true);

    const { message, error } = await deleteRole(id);
    if(error) {
      console.error(error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setOpenModal(null);
      setNotif(prev => [...prev, { type: 'success', message }]);
      _getRoles();
    }
    setDeleteIsLoading(false);
  }

  const items = [
    {
      field: 'name',
      name: 'Roles'
    },
    {
      field: 'users_count',
      name: 'members'
    },
  ]

  return (
    <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="font-bold text-2xl mb-8 dark:text-white">Roles List</h1>
        <div className="flex flex-wrap gap-2 justify-between mb-4">
          <div className="flex gap-2">
            <SortBy items={items} sort={sort} setSort={setSort} direction={direction} setDirection={setDirection} />

            <SearchInput setSearch={setSearch} />
          </div>

          <Button as={Link} to="/roles/add">
            Add Role
          </Button>
        </div>

        <div className="overflow-x-auto">
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
                {roles.length > 0 ? roles.map((role, i) => (
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
                )) : (
                  <Table.Row >
                    <Table.Cell colSpan={10}>
                      <NoData />
                    </Table.Cell>
                  </Table.Row>)}
              </Table.Body>
            </Table>)}
        </div>

        <PerPage setPerPage={setPerPage} />

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => _deleteRole(selectedRoles)} isLoading={deleteIsLoading} />
    </>
  );
}
export default Roles