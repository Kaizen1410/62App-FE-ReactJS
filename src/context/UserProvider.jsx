import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading';
import fetchClient from '../utils/fetchClient';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
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
                // navigate('/login');
            }
        }

        fetchUser();
    }, [navigate]);

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {isLoading ? <Loading size='xl' /> : children}
        </UserContext.Provider>
    );
}

export const UserState = () => {
    return useContext(UserContext);
}

export default UserProvider;