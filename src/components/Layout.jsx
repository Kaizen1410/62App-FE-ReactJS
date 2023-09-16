import { Outlet, useNavigate } from 'react-router';
import Sidebar from './Sidebar';
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
    <>
      <Navbar setIsOpenOnSmallScreen={setIsOpenOnSmallScreen} />
      <Sidebar isOpenOnSmallScreen={isOpenOnSmallScreen} setIsOpenOnSmallScreen={setIsOpenOnSmallScreen} />

      <div className="px-0 pb-4 md:px-4 flex min-h-screen items-center pt-20 ml-auto w-close md:w-open">
        <div className='w-full px-2'>
          <Outlet />
        </div>
      </div>
      <Notif />
    </>
  )
}

export default Layout