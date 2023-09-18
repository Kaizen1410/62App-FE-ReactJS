import { Table,Dropdown, Button } from 'flowbite-react'
import React, { useState } from 'react'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';

 const ProjectEmployees = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [ProjectEmployees, setProjectEmpolyees] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedProject, setSelectedProject] = useState();
    const [openModal, setOpenModal] = useState(null);
    
    return (
        <>
      <div className="bg-white rounded-md p-4 dark:bg-gray-800">
        <h1 className="font-bold dark:text-white text-2xl mb-8">Project Employees List</h1>

        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Dropdown label="Sort By">

            </Dropdown>
          <SearchInput setSearch={setSearch} />
          </div>
          <Button as={Link} to="/projectemployees/add">
            Add Project Employee
          </Button>
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
                Project 
              </Table.HeadCell>
              <Table.HeadCell>
                Start Date
              </Table.HeadCell>
              <Table.HeadCell>
                End Date
              </Table.HeadCell>
              <Table.HeadCell>
                Status
              </Table.HeadCell>
              <Table.HeadCell>
                Action
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                <Table.Row className="text-center" key={ProjectEmployees.id}>
                  <Table.Cell>
                     1
                  </Table.Cell>
                  <Table.Cell className="text-start">
                     test
                  </Table.Cell>
                  <Table.Cell>
                    test
                  </Table.Cell>
                  <Table.Cell>
                   test
                  </Table.Cell>
                  <Table.Cell>
                    test
                  </Table.Cell>
                  <Table.Cell>
                      1
                  </Table.Cell>
                  <Table.Cell className="text-center">
                  <Link to={`/projectemployees/${ProjectEmployees.id}/edit`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => { setSelectedProject(ProjectEmployees.id); setOpenModal('pop-up') }}
                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        Delete
                      </button>
                  </Table.Cell>
                </Table.Row>
           
            </Table.Body>
          </Table>}
        </div>
      </div>
    </>
  );
}


export default ProjectEmployees 