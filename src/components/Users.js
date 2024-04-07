import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const USERS_URL = '/users';

const Users = () => {
    const [users, setUsers] = useState([]);
    const { auth } = useAuth();
    
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        //useEffect execute when component mounted
        let isMountend = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(USERS_URL, {
                    withCredentials: true,
                    signal: controller.signal
                });

                isMountend && setUsers(response.data);
            } catch (err) {
                if(err.response?.status === 403){
                    
                }
            }
        };

        getUsers();

        const cleanUp = () => {
            //clean up function execute when copmonent unmounted
            isMountend = false;
            controller.abort();
        }

        //We can cancel request if component unmounted 
        return cleanUp;

    }, [auth])

    return (
        <article>
            <h2>Users</h2>
            {
                users.length
                    ? <ul>
                        {users.map(user => <li key={uuid()}>{user?.username}</li>)}
                    </ul>
                    : <p>User List is Empty</p>
            }
        </article>
    )
}

export default Users
