import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
      <Sidebar>
        <Outlet />
      </Sidebar>
  )
}

export default Layout