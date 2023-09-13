import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import { Flowbite } from 'flowbite-react';

const Layout = () => {
  return (
    <Flowbite>
      <Sidebar />
      <div className="p-4 ml-auto min-h-screen flex items-center w-close md:w-open">
        <div className='w-full px-2'>
          <Outlet />
        </div>
      </div>
    </Flowbite>
  )
}

export default Layout