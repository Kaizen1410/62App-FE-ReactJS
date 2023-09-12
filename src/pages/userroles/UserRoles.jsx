import { Table, Button } from "flowbite-react"
import fetchClient from "../../utils/fetchClient"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const UserRoles = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [pagination, setPagination] = useState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getAllUserRoles();
  }, [search, page])


  const getAllUserRoles = async () => {
    setisLoading(true);
    try {
      const res = await fetchClient.get(`/api/user-roles?search=${search}&page=${page}`);
      setUserRoles(res.data.data);
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setisLoading(false);
  }

  const handlePage = (p) => {
    if (p === '&laquo; Previous' || p === 'Next &raquo;') {
      setPage(prev => p === '&laquo; Previous' ? prev - 1 : prev + 1);
      return;
    }
    setPage(p);
  }

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center font-bold text-white text-2xl mb-8">User Roles</h1>

      <div className="relative flex justify-between mb-4">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
        <input type="search" className="w-56 pl-8 rounded-md" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />

        <Button as={Link} to='/user-roles/add'>Add</Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <Table striped>
        <Table.Head>
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
            <span className="sr-only">
              Edit
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {userRoles.map((u, i) => (
            <Table.Row>
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
                    <span className="border flex gap-2 items-center px-2 py-1 rounded-md">
                      {r.name}
                    </span>
                  ))}
                </div>
              </Table.Cell>
              <Table.Cell>
                <Link
                  to={`/user-roles/${u.id}/edit`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Edit
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>}

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
  )
}

export default UserRoles