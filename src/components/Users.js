import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
const USERS_URL = '/users';

const Users = () => {

    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

   
    useEffect(() => {

        let isMountend = true;
        const controller = new AbortController(); //controller for aborting axios request

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(USERS_URL, {
                    withCredentials: true,
                    signal: controller.signal
                });
                isMountend && setUsers(response.data); //set data if component mounted
            } catch (err) {
                console.log(err);
                navigate('/login', { state: { from: location },  replace: true } );
            }
        };

        getUsers();

        const cleanUp = () => {
            isMountend = false; //set isMounted false we don't want unnessary state setting
            controller.abort(); //abort axios request if component unmount
        }

        return cleanUp;

    }, []);

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
