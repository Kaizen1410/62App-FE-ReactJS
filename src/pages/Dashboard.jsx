import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { Select, Table } from 'flowbite-react';
import fetchClient from '../utils/fetchClient';

const Dashboard = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthData, setMonthData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Retrieve Leaves per month in specific year
    useEffect(() => {
        const getMonthData = () => {
            setIsLoading(true);
            fetchClient.get(`/api/leaves/year/${year}`)
                .then(res => setMonthData(res.data.data))
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
        }

        getMonthData();
    }, [year]);

    return (
        <>
            <div className='mb-10'>
                <h1 className='text-4xl font-bold text-black dark:text-white'>Dashboard</h1>
            </div>
            <div className="bg-white rounded-md p-4 dark:bg-gray-800">
                <h1 className="font-bold dark:text-white text-2xl mb-8">Leaves Summary</h1>

                <div className="mb-4">
                    <Select
                        className="w-56"
                        icon={() => <i className="fa-solid fa-calendar absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                        <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                    </Select>
                </div>

                <div className="h-96 overflow-y-auto">
                    {isLoading ? <Loading size='xl' /> : (
                        <Table striped>
                            <Table.Head className="text-center sticky top-0">
                                <Table.HeadCell className="w-1">Month</Table.HeadCell>
                                <Table.HeadCell className="w-1">Total Leave</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {monthData.map((month, i) => (
                                    <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                                            {month.monthname}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                                                to={`/calendar`}
                                                state={{ date: new Date(`${year}-${month.month}`) }}
                                            >
                                                <p>
                                                    {month.data_count}
                                                </p>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>)}
                </div>
            </div>
        </>
    );
};


export default Dashboard