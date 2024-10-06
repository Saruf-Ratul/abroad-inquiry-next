"use client";
import Loading from '@/app/loading';
import { GET_INFO_CALL } from '@/services/AuthRequests';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [socket, setSocket] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            GET_INFO_CALL(token)
                .then((res) => {
                    setLoggedInUser(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const value = {
        user: [loggedInUser, setLoggedInUser],
        socketId: [socket, setSocket],
        lastMsg: [lastMessage, setLastMessage],
    };

    return (
        <UserContext.Provider value={value}>
            {!loading ? children : <div>
                <Loading />
                </div>}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
