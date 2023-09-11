import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">
          <Outlet />
      </div>
    </>
  )
}

export default Layout