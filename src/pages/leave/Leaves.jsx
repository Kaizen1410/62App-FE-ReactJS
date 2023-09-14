import { Table, Button, TextInput, Dropdown } from "flowbite-react"
import fetchClient from "../../utils/fetchClient"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import PopUpModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import moment from "moment"
import { SearchIcon } from "../../components/Icons";
import { BeatLoader } from "react-spinners";
import { UserState } from "../../context/UserProvider";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [pagination, setPagination] = useState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState();
  const [selectedLeave, setSelectedLeave] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [importIsLoading, setImportIsLoading] = useState(false);
  const { setNotif } = UserState();

  const [sort, setSort] = useState('date_leave')
  const [direction, setDirection] = useState('desc')
  const [dateLeaveDirection, setDateLeaveDirection] = useState('desc')
  const [isApprovedDirection, setIsApprovedDirection] = useState('asc')

  useEffect(() => {
    getAllLeaves();
  }, [search, page, sort, direction]);

  const getAllLeaves = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get(`/api/leaves?search=${search}&page=${page}&sort=${sort}&direction=${direction}`);
      setLeaves(res.data.data);
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  const handleDeleteLeave = (leaveId) => {
    setDeleteIsLoading(true);
    fetchClient.delete(`/api/leaves/${leaveId}`)
      .then(res => {
        setOpenModal(null);
        setNotif(prev => [...prev, {type: 'delete', message: res.data.message}]);
        getAllLeaves();
      })
      .catch((error) => {
        console.error('Error deleting leaves:', error);
      })
      .finally(() => setDeleteIsLoading(false));
  };

  const handleImport = (target) => {
    const file = target.files[0];
    if (!file) return;
    setImportIsLoading(true);

    const formData = new FormData();
    formData.append('csv', file);

    fetchClient.post(`/api/leaves/import`, formData, { headers: { "Content-Type": 'multipart/form-data' } })
      .then(res => {
        target.value = null;
        setNotif(prev => [...prev, {type: 'add', message: res.data.message}]);
        getAllLeaves()
      })
      .catch((error) => {
        console.error('Error Import Leaves', error)
      })
      .finally(() => setImportIsLoading(false));
  }

  const handleSort = (field) => {
    if (field === sort && field === 'date_leave') {
      setDirection(dateLeaveDirection === 'asc' ? 'desc' : 'asc')
      setDateLeaveDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else if (field === sort && field === 'is_approved') {
      setDirection(isApprovedDirection === 'asc' ? 'desc' : 'asc')
      setIsApprovedDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    }

    setSort(field)
  }

  return (
    <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="font-bold dark:text-white text-2xl mb-8">Leaves List</h1>

        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Dropdown label="sort by">
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('date_leave')}>
                {sort==='date_leave' && (dateLeaveDirection === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Date Leave
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('is_approved')}>
                {sort==='is_approved' && (isApprovedDirection === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-xmark text-red-600"></i> : <i className="fa-solid fa-fade fa-2xs fa-check text-green-400"></i>)}
                Is Approved
              </Dropdown.Item>
            </Dropdown>

            <TextInput className="w-56" icon={SearchIcon} type="search" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            {importIsLoading
              ? <Button disabled className="cursor-pointer h-full">
                <BeatLoader color="white" size={6} className='my-1 mx-2' />
              </Button>
              : <Button as='label' className="cursor-pointer h-full">
                <i className="fa-solid fa-file-import"></i>
                <input
                  type="file"
                  onChange={(e) => handleImport(e.target)}
                  hidden
                />
              </Button>}

            <Button as={Link} to='/leaves/add'>Add Leave</Button>
          </div>
        </div>

        <div className="h-96 overflow-y-auto">
          {isLoading ? <Loading size='xl' /> : <Table striped>
            <Table.Head className="text-center sticky top-0">
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
              {leaves.map((leave, i) => (
                <Table.Row className="text-center" key={i}>
                  <Table.Cell>
                    {(i + 1) + pagination?.per_page * (page - 1)}
                  </Table.Cell>
                  <Table.Cell className="text-start">
                    {leave.employee.name}
                  </Table.Cell>
                  <Table.Cell>
                    {moment(leave.date_leave).format('DD MMMM YYYY')}
                  </Table.Cell>
                  <Table.Cell>
                    {leave.is_approved ? <i className="fa-solid fa-check text-green-400"></i> : <i className="fa-solid fa-xmark text-red-600"></i>
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {leave.approved_by?.name || '-'}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    <Link
                      to={`/leaves/${leave.id}/edit`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedLeave(leave.id)
                        setOpenModal('pop-up')
                      }}
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>}
        </div>

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeleteLeave(selectedLeave)} isLoading={deleteIsLoading} />
    </>
  )
}

export default Leaves