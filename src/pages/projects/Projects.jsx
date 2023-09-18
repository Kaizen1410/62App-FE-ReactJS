import { Table, Button, Dropdown, Avatar } from "flowbite-react"
import fetchClient from "../../utils/fetchClient"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import PopUpModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { UserState } from "../../context/UserProvider";
import PerPage from "../../components/PerPage";
import SearchInput from "../../components/SearchInput";
import { TableCell } from "flowbite-react/lib/esm/components/Table/TableCell";
import moment from "moment";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState();
  const [openModal, setOpenModal] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const { setNotif } = UserState();

  // Query params
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line
  }, [search, page, sort, direction, perPage]);

  // Retrieve Leaves data
  const getProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetchClient.get(`/api/projects?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
      setProjects(res.data.data);
      console.log(res.data.data)
      delete res.data.data;
      setPagination(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  // Delete Leave
  const handleDeleteProject = (projectId) => {
    setDeleteIsLoading(true);
    fetchClient.delete(`/api/projects/${projectId}`)
      .then(res => {
        setOpenModal(null);
        setNotif(prev => [...prev, { type: 'success', message: res.data.message }]);
        getProjects();
      })
      .catch((err) => {
        console.error('Error deleting project:', err);
        setNotif(prev => [...prev, { type: 'failure', message: err.response?.data.message }]);
      })
      .finally(() => setDeleteIsLoading(false));
  };

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
        <h1 className="font-bold dark:text-white text-2xl mb-8">Projects List</h1>

        <div className="flex justify-between mb-4">
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
            <Button as={Link} to='/projects/add'>Add Project</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? <Loading size='xl' /> : <Table striped>
            <Table.Head className="text-center sticky top-0 whitespace-nowrap">
              <Table.HeadCell className="w-1">
                No
              </Table.HeadCell>
              <Table.HeadCell>
                Project Name
              </Table.HeadCell>
              <Table.HeadCell>
                Description
              </Table.HeadCell>
              <Table.HeadCell>
                Start Date
              </Table.HeadCell>
              <Table.HeadCell>
                End Date
              </Table.HeadCell>
              <Table.HeadCell>
                Project Image
              </Table.HeadCell>
              <Table.HeadCell>
                Total Story Point
              </Table.HeadCell>
              <Table.HeadCell>
                Done Story Point
              </Table.HeadCell>
              <Table.HeadCell>
                Status
              </Table.HeadCell>
              <Table.HeadCell>
                Action
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {projects.map((project, i) => (
                <Table.Row className="text-center" key={i}>
                  <Table.Cell>
                    {(i + 1) + pagination?.per_page * (page - 1)}
                  </Table.Cell>
                  <Table.Cell className="text-start whitespace-nowrap">
                    {project.name}
                  </Table.Cell>
                  <TableCell>
                    {project.description}
                  </TableCell>
                  <Table.Cell>
                  {moment(project.start_date).format('DD MMMM YYYY')}
                  </Table.Cell>
                  <Table.Cell>
                  {moment(project.end_date).format('DD MMMM YYYY')}
                  </Table.Cell>
                  <Table.Cell>
                  {project.image_url
                    ? <img src={project.image_url} className='mx-auto h-20 aspect-square object-cover' alt="" />
                    : <Avatar className='mx-auto object-cover' size="lg" />}
                  </Table.Cell>
                  <Table.Cell>
                  {project.total_story_point}
                  </Table.Cell>
                  <Table.Cell>
                  {project.done_story_point}
                  </Table.Cell>
                  <Table.Cell>
                  {project.status}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    <Link
                      to={`/projects/${project.id}/edit`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedProject(project.id)
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

        <PerPage setPerPage={setPerPage} />

        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeleteProject(selectedProject)} isLoading={deleteIsLoading} />
    </>
  )
}

export default Projects