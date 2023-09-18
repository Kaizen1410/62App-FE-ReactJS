import { Table,Dropdown } from 'flowbite-react'
import React, { useState } from 'react'
import Loading from '../components/Loading'
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead';
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell';
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody';
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { Link } from 'react-router-dom';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';
import SearchInput from '../components/SearchInput';

 const ProjectEmployees = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [projectEmployees, setProjectEmpolyees] = useState([]);
    const [search, setSearch] = useState('');
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
              {projectEmployees.map((employee, i) => (
                <Table.Row className="text-center" key={employee.id}>
                  <Table.Cell>
                    {(i + 1)}
                  </Table.Cell>
                  <Table.Cell className="text-start">
                    {employee.employee_id}
                  </Table.Cell>
                  <Table.Cell>
                    {employee.projects_id}
                  </Table.Cell>
                  <Table.Cell>
                    {employee.start_date}
                  </Table.Cell>
                  <Table.Cell>
                    {employee.end_date}
                  </Table.Cell>
                  <Table.Cell>
                    {employee.status === 1 ? 'Planning' : 'Join'}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                  <Link
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
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
      </div>
    </>
  );
}


export default ProjectEmployees 