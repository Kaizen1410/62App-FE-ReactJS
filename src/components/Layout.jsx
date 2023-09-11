import React from 'react'
// import Sidebar from './Sidebar'
import { Outlet } from 'react-router'
import SidebarReact from './SidebarReact'

const Layout = () => {
  return (
    <>
      {/* <Sidebar /> */}
      <SidebarReact />
      <div className="p-4 ml-auto" style={{width: 'calc(100vw - 16rem)'}}>
          <Outlet />
      </div>
    </>
  )
}

export default Layout