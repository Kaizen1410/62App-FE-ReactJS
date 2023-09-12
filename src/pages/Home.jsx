import { UserState } from '../context/UserProvider';

const Home = () => {
    const { user } = UserState();

    return (
        <>
        <h1 className='text-2xl mb-3 text-white font-bold'>Dashboard</h1>
        <h1 className='text-2xl mb-3 text-white'>Welcome { user?.email }</h1>
        </>

    )
}

export default Home