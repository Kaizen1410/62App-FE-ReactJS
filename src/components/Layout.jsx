// import Sidebar from './Sidebar'
import { Outlet } from 'react-router'
import SidebarReact from './SidebarReact'

const Layout = () => {
  return (
    <>
      {/* <Sidebar /> */}
      <SidebarReact />
      <div className="p-4 ml-auto min-h-screen flex items-center" style={{width: 'calc(100vw - 16rem)'}}>
        <div className='w-full px-2'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout