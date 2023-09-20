import { Table, Button, Dropdown, Avatar } from "flowbite-react"
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
import NoData from "../../components/NoData";
import { deleteProject, getProjects } from "../../api/ApiProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState();
  const [openModal, setOpenModal] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const { setNotif } = UserState();

  // Query params
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    _getProjects();
    // eslint-disable-next-line
  }, [search, page, sort, direction, perPage]);

  // Retrieve Leaves data
  const _getProjects = async () => {
    setIsLoading(true);

    const { data, pagination, error } = await getProjects(search, page, sort, direction, perPage);
    if (error) {
      console.error(error);
    } else {
      setProjects(data);
      setPagination(pagination);
    }

    setIsLoading(false);
  }

  // Delete Leave
  const handleDeleteProject = async (projectId) => {
    setDeleteIsLoading(true);

    const { error, message } = await deleteProject(projectId);
    if (error) {
      console.error('Error deleting project:', error);
      setNotif(prev => [...prev, { type: 'failure', message: error }]);
    } else {
      setOpenModal(null);
      setNotif(prev => [...prev, { type: 'success', message }]);
      _getProjects();
    }

    setDeleteIsLoading(false);
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

  const avatarTheme = {
    "root": {
      "img": {
        "base": "rounded object-cover"
      }
    }
  }

  return (
    <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="font-bold dark:text-white text-2xl mb-8">Projects List</h1>

        <div className="flex flex-wrap gap-2 justify-between mb-4">
          <div className="flex gap-2">
            <Dropdown label="Sort By">
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('name')}>
                {sort === 'name' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Name
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('start_date')}>
                {sort === 'start_date' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Start Date
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('end_date')}>
                {sort === 'end_date' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                End Date
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('total_story_point')}>
                {sort === 'total_story_point' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Total Story Point
              </Dropdown.Item>
              <Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('done_story_point')}>
                {sort === 'done_story_point' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Done Story Point
              </Dropdown.Item><Dropdown.Item className="cursor-pointer gap-2" onClick={() => handleSort('status')}>
                {sort === 'status' && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                Status
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
                Name
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
                Image
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
            <Table.Body className='divide-y'>
              {projects.length > 0 ? projects.map((project, i) => (
                <Table.Row className="text-center" key={i}>
                  <Table.Cell>
                    {(i + 1) + pagination?.per_page * (page - 1)}
                  </Table.Cell>
                  <Table.Cell className="text-start whitespace-nowrap">
                    {project.name}
                  </Table.Cell>
                  <TableCell>
                    <div className="w-96" style={{ wordWrap: "break-word" }}>
                      {project.description}
                    </div>
                  </TableCell>
                  <Table.Cell className="whitespace-nowrap">
                    {project.start_date ? moment(project.start_date).format("DD MMMM YYYY") : "-"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {project.end_date ? moment(project.end_date).format("DD MMMM YYYY") : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="w-20">
                      <Avatar theme={avatarTheme} img={project.image_url} size='lg' className='mx-auto w-full' alt="" />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {project.total_story_point}
                  </Table.Cell>
                  <Table.Cell>
                    {project.done_story_point}
                  </Table.Cell>
                  <Table.Cell>
                    {project.status === 1 ? 'Proposal' : project.status === 2 ? 'On Going' : 'Done'}
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

      <PopUpModal openModal={openModal} setOpenModal={setOpenModal} action={() => handleDeleteProject(selectedProject)} isLoading={deleteIsLoading} />
    </>
  )
}

export default Projects