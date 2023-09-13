import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { UserState } from '../context/UserProvider';

const Dashboard = () => {
    const { user } = UserState();

    return (
        <>
            <Flowbite>
                
                <DarkThemeToggle className='absolute top-10 right-10' />
                
            </Flowbite>
            <h1 className='text-2xl mb-3 text-white font-bold'>Dashboard</h1>
            <h1 className='text-2xl mb-3 text-white'>Welcome {user?.email}</h1>
        </>

    )
}

export default Dashboard