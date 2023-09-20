import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { Badge, Card, Progress, Select, Table } from 'flowbite-react';
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
    const [projectYear, setProjectYear] = useState(new Date().getFullYear());

    // Retrieve Leaves per month in specific year
    useEffect(() => {
        const getRequiredData = async () => {
            setIsLoading(true);

            const leavesSummaryData = getLeavesSummary(year);
            const projectsSummaryData = getProjectsSummary(projectYear);

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
    }, [year, projectYear]);

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

                <div className="mb-4">
                    <Select
                        className="w-56"
                        icon={() => <i className="fa-solid fa-calendar absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>}
                        value={projectYear}
                        onChange={(e) => setProjectYear(e.target.value)}
                    >
                        {yearOptions.map((projectYear) => (
                            <option key={projectYear} value={projectYear}>
                                {projectYear}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className='flex flex-wrap gap-5'>
                    {projectSummary.length > 0 ? projectSummary.map(project => (
                        <Card style={{ width: '32%' }}>
                            <div className='flex items-center justify-center gap-2'>
                                <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{project.name}</h5>
                                {project.status === 1
                                    ? <Badge>Proposal</Badge>
                                    : project.status === 2
                                        ? <Badge color='warning'>Ongoing</Badge>
                                        : <Badge color='success'>Done</Badge>
                                }
                            </div>
                            <img className='object-cover aspect-square' src={project.image_url} alt="" />
                            <div className="font-normal text-gray-700 dark:text-gray-400">
                                Employee :
                                {project.project_employees.map(employee => (
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {employee.employee.name}
                                    </p>))}
                            </div>
                            <div className="font-normal text-gray-700 dark:text-gray-400">
                                Progress :
                                <Progress
                                    progress={(project.done_story_point / project.total_story_point) * 100}
                                    size="lg"
                                    labelProgress={(project.done_story_point / project.total_story_point) * 100}
                                    progressLabelPosition='inside'
                                />
                            </div>
                        </Card>
                    )) : <NoData />}
                </div>
            </div>
        </>
    );
};


export default Dashboard