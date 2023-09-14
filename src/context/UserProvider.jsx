import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Spinner } from "flowbite-react"
import fetchClient from '../utils/fetchClient';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [notif, setNotif] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user login info
        const fetchUser = async () => {
            try {
                const res = await fetchClient.get('/api/auth/user');
                setUser(res.data.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
                navigate('/login');
            }
        }
        fetchUser();
    }, []);

    return(
        <UserContext.Provider value={{ user, setUser, notif, setNotif }}>
            {isLoading
            ?
            <div className='h-screen flex items-center justify-center'>
                <Spinner size='xl' />
            </div>
            : children}
        </UserContext.Provider>
    );
}

export const UserState = () => {
    return useContext(UserContext);
}

export default UserProvider;