import { Sidebar } from 'flowbite-react';
import { Link, useNavigate } from "react-router-dom";
import fetchClient from "../utils/fetchClient";

const Leave = () => {
    return (
        <i className="fa-solid fa-plane text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
    )
}

const Master = () => {
    return (
        <i className="fa-solid fa-folder-closed text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
    )
}

const SidebarReact = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetchClient.get('/api/auth/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Sidebar className='h-screen fixed'>
            <Link to='/' className='text-black text-center font-bold text-2xl mb-4'>
                Employee Absent
            </Link>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item as={Link} to='/leaves' className="group"
                        icon={Leave}
                    >
                        Leave
                    </Sidebar.Item>
                    <Sidebar.Collapse
                        icon={Master}
                        label="Master"
                    >
                        <Sidebar.Item as={Link} to='/roles'>
                            Roles
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/user-roles'>
                            User Roles
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/employees'>
                            <Link to='/employees' className='inline-block w-full'>
                                Employees
                            </Link>
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/employee-positions'>
                            Employee Positions
                        </Sidebar.Item>
                    </Sidebar.Collapse>

                    <div className='absolute bottom-5 left-5 right-5'>
                        <button className="flex items-center justify-center w-full p-2 border border-black text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket -scale-x-100 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                            <span className="ml-2 font-semibold">Logout</span>
                        </button>
                    </div>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SidebarReact