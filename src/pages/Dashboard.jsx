import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'flowbite-react';
import { UserState } from '../context/UserProvider';

const Dashboard = () => {
  const { user } = UserState();

  return (
    <>
    <div className='mb-10'>
      <h1 className='text-4xl font-bold text-white'>Dashboard</h1>
      <h3 className='text-white font-semibold text-xl'>Welcome {user?.email}</h3>
    </div>
    <div className="bg-white rounded-md p-4 dark:bg-gray-800">
      <h1 className="font-bold dark:text-white text-2xl mb-8">Leaves Summary</h1>

      <div className="relative mb-4">
        <i className="fa-solid fa-calendar absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
        <select className="w-56 pl-8 rounded-md">
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>

      <div className="h-96 overflow-y-auto">
        <Table striped>
          <Table.Head className="text-center sticky top-0">
            <Table.HeadCell className="w-1">Month</Table.HeadCell>
            <Table.HeadCell className="w-1">Total Leave</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                January
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                February
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                March
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                April
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                May
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                June
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                July
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                August
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                September
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                October
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                November
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                December
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                  href="/Calendar"
                >
                  <p>
                    100
                  </p>
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

      </div>
    </div>
    </>
  );
};


export default Dashboard