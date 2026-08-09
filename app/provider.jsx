"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';

const DEMO_USER = {
    id: "demo-user",
    name: "Demo User",
    email: "demo@edu-pilot.app"
};

function Provider({ children }) {
    const [userDetail, setUserDetail] = useState(DEMO_USER);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

    useEffect(() => {
        createNewUser();
    }, []);

    const createNewUser = async () => {
        console.log("Initializing demo user:", DEMO_USER.name, DEMO_USER.email);
        try {
            const result = await axios.post('/api/user', {
                name: DEMO_USER.name,
                email: DEMO_USER.email
            });
            console.log("Server returned user detail:", result.data);
            if (result.data && !result.data.error) {
                setUserDetail(result.data);
            }
        } catch (err) {
            console.error("API Error in createNewUser:", err);
        }
    };

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <SelectedChapterIndexContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }}>
                <div>{children}</div>
            </SelectedChapterIndexContext.Provider>
        </UserDetailContext.Provider>
    );
}

export default Provider;

