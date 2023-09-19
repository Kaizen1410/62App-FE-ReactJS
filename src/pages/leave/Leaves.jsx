import { Table, Button, Dropdown, Tooltip } from "flowbite-react"
import fetchClient from "../../utils/fetchClient"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import PopUpModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import moment from "moment";
import { BeatLoader } from "react-spinners";
import { UserState } from "../../context/UserProvider";
import PerPage from "../../components/PerPage";
import SearchInput from "../../components/SearchInput";
import NoData from "../../components/NoData";
import { deleteLeave, getLeaves, importLeave } from "../../api/ApiLeave";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [pagination, setPagination] = useState();
  const [openModal, setOpenModal] = useState();
  const [selectedLeave, setSelectedLeave] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [importIsLoading, setImportIsLoading] = useState(false);
  const { setNotif } = UserState();

  // Query params
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('date_leave');
  const [direction, setDirection] = useState('desc');
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    _getLeaves();
    // eslint-disable-next-line
  }, [search, page, sort, direction, perPage]);

  // Retrieve Leaves data
  const _getLeaves = async () => {
    setIsLoading(true);
    const { data, error, pagination } = await getLeaves(search, page, sort, direction, perPage);
    if (error) {
      console.error(error);
    } else {
      setLeaves(data);
      setPagination(pagination);
    }
    setIsLoading(false);
  }

  // Delete Leave
  const handleDeleteLeave = async (leaveId) => {
    setDeleteIsLoading(true);
    const { message, error } = await deleteLeave(leaveId);
    if (error) {
      console.error('Error deleting leaves:', error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setOpenModal(null);
      setNotif(prev => [...prev, { type: 'success', message }]);
      _getLeaves();
    }
    setDeleteIsLoading(false);
  };

  // Add Leave with CSV file
  const handleImport = async (target) => {
    const file = target.files[0];
    if (!file) return;
    setImportIsLoading(true);

    const formData = new FormData();
    formData.append('csv', file);

    const { error, message } = await importLeave(formData);
    if (error) {
      console.error('Error Import Leaves', error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      target.value = null;
      setNotif(prev => [...prev, { type: 'success', message }]);
      _getLeaves();
    }
    setImportIsLoading(false);
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
        <h1 className="font-bold dark:text-white text-2xl mb-8">Leaves List</h1>

        <div className="flex flex-wrap gap-2 justify-between mb-4">
          <div className="flex gap-2">
            <Dropdown label="Sort By">
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('employee_name')}>
                {sort === 'employee_name' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Name
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('date_leave')}>
                {sort === 'date_leave' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Date Leave
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('is_approved')}>
                {sort === 'is_approved' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-xmark text-red-600"></i> : <i className="fa-solid fa-fade fa-2xs fa-check text-green-400"></i>)}
                Is Approved
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('approved_by')}>
                {sort === 'approved_by' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Approved By
              </Dropdown.Item>
            </Dropdown>

            <SearchInput setSearch={setSearch} />
          </div>
          <div className="flex items-stretch gap-2">
            {importIsLoading
              ? <Button disabled className="cursor-pointer h-full">
                <BeatLoader color="white" size={6} className='my-1 mx-2' />
              </Button>
              : <Tooltip content='Import CSV file' className="">
                <Button as='label' className="cursor-pointer h-full">
                  <i className="fa-solid fa-file-import"></i>
                  <input
                    type="file"
                    onChange={(e) => handleImport(e.target)}
                    hidden
                  />
                </Button>
              </Tooltip>}

            <Button as={Link} to='/leaves/add'>Add Leave</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
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
              {leaves.length > 0 ? leaves.map((leave, i) => (
                <Table.Row className="text-center" key={i}>
                  <Table.Cell>
                    {(i + 1) + pagination?.per_page * (page - 1)}
                  </Table.Cell>
                  <Table.Cell className="text-start">
                    {leave.employee_name || '(Deleted Employee)'}
                  </Table.Cell>
                  <Table.Cell>
                    {moment(leave.date_leave).format('DD MMMM YYYY')}
                  </Table.Cell>
                  <Table.Cell>
                    {leave.is_approved ? <i className="fa-solid fa-check text-green-400"></i> : <i className="fa-solid fa-xmark text-red-600"></i>
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {leave.approved_by || '-'}
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
              )) : (
                <Table.Row >
                  <Table.Cell colSpan={10}>
                    <NoData />
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>}
        </div>

        <PerPage setPerPage={setPerPage} />

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeleteLeave(selectedLeave)} isLoading={deleteIsLoading} />
    </>
  )
}

export default Leaves