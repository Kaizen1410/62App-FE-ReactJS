function Navbar() {
    return (
        <div className="navbar bg-cyan-950">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="text-cyan-400"><a href='/leave'>Leave</a></li>
                        <li className="text-cyan-400"><a href='/roles'>Role</a></li>
                        <li className="text-cyan-400"><a href='/userroles'>User Roles</a></li>
                        <li className="text-cyan-400"><a href='/employees'>Employees</a></li>
                        <li className="text-cyan-400"><a href='/employeepositions'>Employee Positions</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex-1">
                <a href='/home' className="btn btn-ghost normal-case text-xl text-cyan-400">Selamat Datang</a>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current text-cyan-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li className="text-cyan-400"><a href='/'>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar