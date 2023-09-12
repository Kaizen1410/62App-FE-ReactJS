import { Checkbox, Table } from 'flowbite-react';
import { useState, useEffect } from 'react';
import fetchClient from '../../utils/fetchClient';
import { Link } from 'react-router-dom';


const Leave = () => {

  const [leave, setLeave] = useState([]);
  const [pagination, setPagination] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchClient.get(`/api/leaves?page=${page}&search=${search}`).then(res => {
      console.log(res)
      setLeave(res.data.data);
      setPagination(res.data);
    })
      .catch(err => console.error(err))
      .finally(() => setTimeout(() => { setIsLoading(false) }, 500));

  }, [page, search])

  const deleteLeave = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    fetchClient.delete(`/api/leaves/${id}`)
      .then(res => {
        alert(res.data.message);
        thisClicked.innerText = "Delete";
        fetchClient.get(`/api/leaves?page=${page}&search=${search}`).then(res => {
          console.log(res)
          setLeave(res.data.data);
          setPagination(res.data);
        });
      });
  }

  const handlePage = (p) => {
    if (p === '&laquo; Previous' || p === 'Next &raquo;') {
      setPage(prev => p === '&laquo; Previous' ? prev - 1 : prev + 1);
      return;
    }
    setPage(p);
  }

  var leaveDetails = '';
  leaveDetails = leave.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.employee_position.name}</td>
        <td className='flex justify-center gap-10'>
          <Link to={`/leaves/${item.id}/edit`} className="btn text-cyan-400">Edit</Link>
          <button type="button" onClick={(e) => deleteLeave(e, item.id)} className="btn text-red-600">Delete</button>
        </td>
      </tr>
    )
  })

  const Filter = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center text-white">Leaves List</h1>
      <form className='mb-4 flex'>
        <input
          type="search"
          className="border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 w-full"
          placeholder='Search...'
          onChange={(e) => setSearch(e.target.value)} />
        <Link to='/leaves/add'
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
        >
          Add Leaves
        </Link>
      </form>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>
            Approved
          </Table.HeadCell>
          <Table.HeadCell>
            Employee
          </Table.HeadCell>
          <Table.HeadCell>
            Date Leave
          </Table.HeadCell>
          <Table.HeadCell>
            Approved By
          </Table.HeadCell>
          <Table.HeadCell>
            Edit
          </Table.HeadCell>
          <Table.HeadCell>
            Delete
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              <Checkbox className='' />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Jongkieess
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              17 Oktober
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Muhajir
            </Table.Cell>
            <Table.Cell>
              <Link
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                to="/leaves/edit"
              >
                <p>
                  Edit
                </p>
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                to="/leaves/edit"
              >
                <p>
                  Delete
                </p>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default Leave