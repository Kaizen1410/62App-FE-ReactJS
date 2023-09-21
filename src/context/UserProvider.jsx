import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Spinner } from "flowbite-react"
import { getUser } from '../api/ApiAuth';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [notif, setNotif] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user login info
        const fetchUser = async () => {
            const { data, error } = await getUser()
            if(error) {
                console.error(error);
                navigate('/login');
            } else {
                setUser(data);
            }
            setIsLoading(false);
        }

        const theme = localStorage.getItem('theme');
        if(theme==='dark') document.querySelector('html').classList.add('dark');

        fetchUser();
        // eslint-disable-next-line
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