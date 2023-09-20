import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { Badge, Card, Select, Table } from 'flowbite-react';
import { getLeavesSummary } from '../api/ApiLeave';
import NoData from '../components/NoData';
import { getProjectsSummary } from '../api/ApiProject';

const Dashboard = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthData, setMonthData] = useState([]);
    const [projectSummary, setProjectSummary] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 3 + i);

    // Retrieve Leaves per month in specific year
    useEffect(() => {
        const getRequiredData = async () => {
            setIsLoading(true);

            const leavesSummaryData = getLeavesSummary(year);
            const projectsSummaryData = getProjectsSummary();

            const [leavesSummary, projectsSummary] = await Promise.all([leavesSummaryData, projectsSummaryData]);
            if (leavesSummary.error || projectsSummary.error) {
                console.error(leavesSummary.error);
                console.error(projectsSummary.error);
            } else {
                setMonthData(leavesSummary.data);
                setProjectSummary(projectsSummary.data);
            }
            setIsLoading(false);
        }

        getRequiredData();
    }, [year]);

    return (
        <>
            <div className='mb-10'>
                <h1 className='text-4xl font-bold text-black dark:text-white'>Dashboard</h1>
            </div>
            <div className="bg-white rounded-md p-4 dark:bg-gray-800 mb-3">
                <h1 className="font-bold dark:text-white text-2xl mb-8">Leaves Summary</h1>

                <div className="mb-4">
                    <Select
                        className="w-56"
                        icon={() => <i className="fa-solid fa-calendar absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>}
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className='overflow-x-auto'>
                    {isLoading ? <Loading size='xl' /> : (
                        <Table striped>
                            <Table.Head className="text-center sticky top-0">
                                <Table.HeadCell className="w-1">Month</Table.HeadCell>
                                <Table.HeadCell className="w-1">Total Leave</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {monthData.length > 0 ? monthData.map((month, i) => (
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
                                )) : (
                                    <Table.Row >
                                        <Table.Cell colSpan={10}>
                                            <NoData />
                                        </Table.Cell>
                                    </Table.Row>)}
                            </Table.Body>
                        </Table>)}
                </div>

            </div>

            <div className="bg-white rounded-md p-4 dark:bg-gray-800">
                <h1 className="font-bold dark:text-white text-2xl mb-8">Projects Summary</h1>

                <div className='flex flex-wrap gap-3'>
                    {projectSummary.map(project => (
                        <Card className='max-w-md'>
                            <div className='flex items-center gap-2'>
                                <h2 className='text-black dark:text-white'>{project.name}</h2>
                                {project.status===1
                                ? <Badge>Proposal</Badge>
                                : project.status===2
                                ? <Badge color='warning'>Ongoing</Badge>
                                : <Badge color='success'>Done</Badge>
                                }
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};


export default Dashboard