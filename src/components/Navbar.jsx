import { Button, DarkThemeToggle, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

const NavbarReact = ({ setIsOpenOnSmallScreen }) => {
    return (
        <Navbar
            fluid
            className='bg-gray-50 fixed top-0 w-full z-50 shadow-md'
        >
            <div className='flex'>
                <Button className='p-0 overflow-x-hidden w-10 md:w-0 transition-all' color='rgba(0, 0, 0, 0)' onClick={() => setIsOpenOnSmallScreen(prev => !prev)}>
                    <svg className="w-6 h-6 text-black dark:text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </Button>
                <Navbar.Brand as={Link} to='/'>
                    <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
                        Employee Leave
                    </span>
                </Navbar.Brand>
            </div>

            <div className='flex items-center gap-2'>
                <span className='text-black dark:text-white'>amuhajir.syamlan@gmail.com</span>
                <DarkThemeToggle />
            </div>
        </Navbar>
    )
}

export default NavbarReact