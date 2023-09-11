import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ children }) {
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         const res = await axios.get('/api/auth/logout', {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` || ''}
         });
         alert(res.data.message);
         navigate('/login');
      } catch (err) {
         console.error(err);
      }
   }

   return (
      <>
         <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>

         <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full relative px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
               <h1 className="text-2xl text-black font-bold text-center mb-10">Employee Leave</h1>
               <ul className="space-y-2 font-medium">
                  <li>
                     <Link to="/leave" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i className="fa-solid fa-plane text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                        <span className="ml-3">Leave</span>
                     </Link>
                  </li>
                  <li>
                     <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <i className="fa-solid fa-folder-closed text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Master</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                     </button>
                     <ul id="dropdown-example" className="hidden py-2 space-y-2">
                        <li>
                           <Link to="/roles" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Roles</Link>
                        </li>
                        <li>
                           <Link to="/userroles" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">User Roles</Link>
                        </li>
                        <li>
                           <Link to="/employees" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Employees</Link>
                        </li>
                        <li>
                           <Link to="/employee-positions" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Employee Positions</Link>
                        </li>
                     </ul>
                  </li>
               </ul>

               <div className="absolute bottom-5 left-5 right-5">
                  <button className="flex items-center justify-center w-full p-2 border border-black text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={handleLogout}>
                     <i className="fa-solid fa-right-from-bracket -scale-x-100 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                     <span className="ml-2 font-semibold">Logout</span>
                  </button>
               </div>
            </div>
         </aside>

         <div className="p-4 sm:ml-64">
            {children}
         </div>
      </>
   )
}


