import { Outlet, useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import { Flowbite } from 'flowbite-react';
import Notif from './Notif';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';

const Layout = () => {
  const [isOpenOnSmallScreen, setIsOpenOnSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpenOnSmallScreen(false);
}, [navigate]);

  return (
    <Flowbite>
      <Navbar setIsOpenOnSmallScreen={setIsOpenOnSmallScreen} />
      <Sidebar isOpenOnSmallScreen={isOpenOnSmallScreen} setIsOpenOnSmallScreen={setIsOpenOnSmallScreen} />

      <div className="p-4 pt-20 ml-auto min-h-screen flex items-center w-close md:w-open">
        <div className='w-full px-2'>
          <Outlet />
        </div>
      </div>
      <Notif />
    </Flowbite>
  )
}

export default Layout