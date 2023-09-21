import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { Badge, Card, Progress, Select, Table } from 'flowbite-react';
import { getLeavesSummary } from '../api/ApiLeave';
import NoData from '../components/NoData';
import { getProjectsSummary } from '../api/ApiProject';

const Dashboard = () => {
    const [leaveYear, setLeaveYear] = useState(new Date().getFullYear());
    const [leaveSummary, setLeaveSummary] = useState([]);
    const [leaveIsLoading, setLeaveIsLoading] = useState(true);

    const [projectYear, setProjectYear] = useState('');
    const [projectSummary, setProjectSummary] = useState([]);
    const [projectIsLoading, setProjectIsLoading] = useState(true);

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 3 + i);

    // Retrieve Leaves per month in specific year
    useEffect(() => {
        const _getLeavesSummary = async () => {
            setLeaveIsLoading(true);
            const { data, error } = await getLeavesSummary(leaveYear);
            if (error) {
                console.error(error);
            } else {
                setLeaveSummary(data);
            }
            setLeaveIsLoading(false);
        }

        _getLeavesSummary();
    }, [leaveYear]);

    useEffect(() => {
        const _getProjectsSummary = async () => {
            setProjectIsLoading(true);

            const { data, error } = await getProjectsSummary(projectYear);
            if (error) {
                console.error(error);
            } else {
                setProjectSummary(data);
            }

            setProjectIsLoading(false);
        }

        _getProjectsSummary();
    }, [projectYear])


    return (
        <>
            <div className='mb-10'>
                <h1 className='text-4xl font-bold text-black dark:text-white'>Dashboard</h1>
            </div>
            <div className="bg-white rounded-md p-4 dark:bg-gray-800 mb-5">
                <h1 className="font-bold dark:text-white text-2xl mb-8">Leaves Summary</h1>

                <div className="mb-4">
                    <Select
                        className="w-56"
                        icon={() => <i className="fa-solid fa-calendar absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>}
                        value={leaveYear}
                        onChange={(e) => setLeaveYear(e.target.value)}
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className='overflow-x-auto'>
                    {leaveIsLoading ? <Loading size='xl' /> : (
                        <Table striped>
                            <Table.Head className="text-center sticky top-0">
                                <Table.HeadCell className="w-1">Month</Table.HeadCell>
                                <Table.HeadCell className="w-1">Total Leave</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {leaveSummary.length > 0 ? leaveSummary.map((month, i) => (
                                    <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                                            {month.monthname}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-center"
                                                to={`/calendar`}
                                                state={{ date: new Date(`${leaveYear}-${month.month}`) }}
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

            <div className="bg-white dark:bg-gray-800 rounded-md p-4">
                <h1 className="font-bold dark:text-white text-2xl mb-8">Projects Summary</h1>

                <div className="mb-4">
                    <Select
                        className="w-56"
                        icon={() => <i className="fa-solid fa-calendar absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>}
                        value={projectYear}
                        onChange={(e) => setProjectYear(e.target.value)}
                    >
                        <option value="">All</option>
                        {yearOptions.map((projectYear) => (
                            <option key={projectYear} value={projectYear}>
                                {projectYear}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className='flex flex-wrap'>
                    {projectIsLoading ? <Loading size='xl' /> : projectSummary.length > 0 ? projectSummary.map(project => (
                        <div className='w-full sm:w-1/2 lg:w-1/3 p-2'>
                        <Card className='h-full' >
                            <div className='flex items-center justify-center gap-2'>
                                <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{project.name}</h5>
                                {project.status === 1
                                    ? <Badge>Proposal</Badge>
                                    : project.status === 2
                                        ? <Badge color='warning'>Ongoing</Badge>
                                        : <Badge color='success'>Done</Badge>
                                }
                            </div>
                            <img className='object-cover aspect-square -p-6' src={project.image_url} alt="" />
                            <div className="font-normal text-gray-700 dark:text-gray-400">
                                Employees :
                                <ul className='list-disc list-inside'>
                                    {project.project_employees.map(employee => (
                                        <li className="font-normal text-gray-700 dark:text-gray-400">
                                            {employee.employee.name}
                                        </li>))}
                                </ul>
                            </div>
                            <div className="mt-auto font-normal text-gray-700 dark:text-gray-400">
                                Progress :
                                <Progress
                                    progress={Math.floor((project.done_story_point / project.total_story_point) * 100) || 0}
                                    size="lg"
                                    labelProgress={true}
                                    progressLabelPosition='inside'
                                />
                            </div>
                        </Card>
                        </div>
                    )) : <NoData />}
                </div>
            </div>
        </>
    );
};


export default Dashboard