import { Outlet } from 'react-router'
import SidebarReact from './SidebarReact'

const Layout = () => {
  return (
    <>
      <SidebarReact />
      <div className="md:p-4 ml-auto min-h-screen flex items-center w-close md:w-open">
        <div className='w-full px-2'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout