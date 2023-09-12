import { Table, Button } from "flowbite-react"
import fetchClient from "../../utils/fetchClient"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import PopUpModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";

const Leave = () => {
  const [leave, setLeave] = useState([]);
  const [pagination, setPagination] = useState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState();

  useEffect(() => {
    getAllLeave();
  }, [search, page])


  const getAllLeave = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get(`/api/leaves?search=${search}&page=${page}`);
      setLeave(res.data.data);
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  const handlePage = (p) => {
    if (p === '&laquo; Previous' || p === 'Next &raquo;') {
      setPage(prev => p === '&laquo; Previous' ? prev - 1 : prev + 1);
      return;
    }
    setPage(p);
  }

  const handleDeleteLeave = (leaveId) => {
    fetchClient.delete(`/api/leaves/${leaveId}`)
      .then(() => {
        setLeave(leave.filter((leave) => leave.id !== leaveId));
        setOpenModal(null);
      })
      .catch((error) => {
        console.error('Error deleting leaves:', error);
      });
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-center font-bold text-white text-2xl mb-8">Leaves</h1>

      <div className="relative flex justify-between mb-4">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
        <input type="search" className="w-56 pl-8 rounded-md" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />

        <Button as={Link} to='/leaves/add'>Add Leave</Button>
      </div>

      {isLoading ? <Loading size='xl' /> : <Table striped>
        <Table.Head className="text-center">
          <Table.HeadCell className="w-1">
            No
          </Table.HeadCell>
          <Table.HeadCell>
            Name
          </Table.HeadCell>
          <Table.HeadCell>
            Date Leave
          </Table.HeadCell>
          <Table.HeadCell>
            Is Approved
          </Table.HeadCell>
          <Table.HeadCell>
            Approved By
          </Table.HeadCell>
          <Table.HeadCell>
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {leave.map((l, i) => (
            <Table.Row className="text-center">
              <Table.Cell>
                {(i + 1) + pagination?.per_page * (page - 1)}
              </Table.Cell>
              <Table.Cell className="text-start">
                {l.employee.name}
              </Table.Cell>
              <Table.Cell>
                {l.date_leave}
              </Table.Cell>
              <Table.Cell>
                {l.is_approved ? <i className="fa-solid fa-check text-green-400"></i> : <i className="fa-solid fa-xmark text-red-600"></i>
                }
              </Table.Cell>
              <Table.Cell>
                {l.approved_by?.name}
              </Table.Cell>
              <Table.Cell className="text-center">
                <Link
                  to={`/leaves/${l.id}/edit`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    setSelectedLeave(l.id)
                    setOpenModal('pop-up')}}
                  className="font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>}

      <Pagination pagination={pagination} page={page} setPage={setPage} />

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeleteLeave(selectedLeave)} />
    </div>
  )
}

export default Leave