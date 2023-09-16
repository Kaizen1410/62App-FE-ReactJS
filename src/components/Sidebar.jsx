import { Sidebar } from 'flowbite-react';
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../utils/fetchClient";
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { MasterIcon, LeaveIcon } from './Icons';


const SidebarReact = ({ isOpenOnSmallScreen, setIsOpenOnSmallScreen }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await fetchClient.get('/api/auth/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    }

    const sidebarTheme = {
        "root": {
            "inner": "h-full overflow-y-auto overflow-x-hidden bg-gray-50 pt-20 pb-4 px-3 dark:bg-gray-800"
        }
    }

    return (
        <>

            {isOpenOnSmallScreen && <div className='bg-backdrop z-40 absolute w-screen h-screen md:hidden' onClick={() => setIsOpenOnSmallScreen(false)}></div>}

            <Sidebar theme={sidebarTheme} className={`fixed z-40 ${!isOpenOnSmallScreen && 'w-0'} overflow-x-hidden md:w-64 transition-all`}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item as={Link} to='/leaves' className="group"
                            icon={LeaveIcon}
                        >
                            Leaves
                        </Sidebar.Item>
                        <Sidebar.Collapse
                            icon={MasterIcon}
                            label="Master"
                        >
                            <Sidebar.Item as={Link} to='/roles'>
                                <i className="fa-solid fa-users-gear mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                <span>Roles</span>
                            </Sidebar.Item>
                            <Sidebar.Item as={Link} to='/user-roles'>
                                <i className="fa-solid fa-user-gear mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                <span>User Roles</span>
                            </Sidebar.Item>
                            <Sidebar.Item as={Link} to='/employees'>
                                <Link to='/employees' className='inline-block w-full'>
                                    <i className="fa-solid fa-briefcase mr-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                    <span>Employees</span>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item as={Link} to='/employee-positions'>
                                <i className="fa-solid fa-network-wired mr-3 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                <span>Employee Positions</span>
                            </Sidebar.Item>
                        </Sidebar.Collapse>

                        <div className='absolute bottom-5 left-5 right-5'>
                            <button className="flex items-center justify-center w-full p-2 border border-black dark:border-white text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={handleLogout}>
                                {isLoading
                                    ? <BeatLoader color="white" size={10} className='my-1' />
                                    : <>
                                        <i className="fa-solid fa-right-from-bracket -scale-x-100 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                        <span className="ml-2 font-semibold">Logout</span>
                                    </>}
                            </button>
                        </div>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    )
}

export default SidebarReact