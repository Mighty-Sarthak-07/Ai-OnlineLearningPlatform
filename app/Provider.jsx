"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserdetailsContext } from '@/context/UserDetailsContext';
import { SelectedChapterContext } from '@/context/SelectedChapterContext';

function Provider({children}){
    const {user} = useUser();
    const [userDetails, setUserDetails] = useState();
    const [selectedChapter, setSelectedChapter] = useState(0);

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
            
        }
    }

    return (
        <UserdetailsContext.Provider value={{userDetails, setUserDetails}}>
            <SelectedChapterContext.Provider value={{selectedChapter, setSelectedChapter}}>
            <div>
                {children}
            </div>
            </SelectedChapterContext.Provider>
        </UserdetailsContext.Provider>
    )
}

export default Provider