import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        // Get user login info
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/auth/user', {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}` || ''}
                })
                setUser(res.data.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUser();
    }, []);

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const UserState = () => {
    return useContext(UserContext);
}

export default UserProvider;