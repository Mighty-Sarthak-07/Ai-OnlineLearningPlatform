"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect } from 'react';

function Provider({children}){
    const {user} = useUser();

    useEffect(() => {
        if (user) {
            console.log('User data:', {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress
            });
            CreateNewUser();
        }
    }, [user]);

    const CreateNewUser = async () => {
        try {
            const result = await axios.post('/api/user', {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
            });
            console.log('User created:', result.data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Provider