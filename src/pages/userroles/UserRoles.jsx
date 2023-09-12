import { Table, Button } from "flowbite-react"
import fetchClient from "../../utils/fetchClient"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

const UserRoles = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [pagination, setPagination] = useState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllUserRoles();
  }, [search, page])


  const getAllUserRoles = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get(`/api/user-roles?search=${search}&page=${page}`);
      setUserRoles(res.data.data);
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center font-bold text-white text-2xl mb-8">User Roles</h1>

      <div className="relative mb-4">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
        <input type="search" className="w-56 pl-8 rounded-md" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
      </div>

      {isLoading ? <Loading size='xl' /> : <Table striped>
        <Table.Head className="text-center">
          <Table.HeadCell className="w-1">
            No
          </Table.HeadCell>
          <Table.HeadCell>
            Email
          </Table.HeadCell>
          <Table.HeadCell>
            Name
          </Table.HeadCell>
          <Table.HeadCell>
            Roles
          </Table.HeadCell>
          <Table.HeadCell>
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {userRoles.map((u, i) => (
            <Table.Row key={i}>
              <Table.Cell className="text-center">
                {(i + 1) + pagination?.per_page * (page - 1)}
              </Table.Cell>
              <Table.Cell>
                {u.email}
              </Table.Cell>
              <Table.Cell>
                {u.employee.name}
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap gap-1">
                  {u.roles.map(r => (
                    <span key={r.id} className="border flex gap-2 items-center px-2 py-1 rounded-md">
                      {r.name}
                    </span>
                  ))}
                </div>
              </Table.Cell>
              <Table.Cell className="text-center">
                <Link
                  to={`/user-roles/${u.id}/edit`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>}

      <Pagination pagination={pagination} page={page} setPage={setPage} />
    </div>
  )
}

export default UserRoles