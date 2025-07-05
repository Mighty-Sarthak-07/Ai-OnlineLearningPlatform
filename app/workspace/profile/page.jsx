'use client'

import React from 'react';
import { UserProfile } from '@clerk/nextjs';
import AppHeader from '../_components/AppHeader';

function Profile() {
  return (
    <div>
      <AppHeader/>
    <div className="p-4">
      <h2 className="md:text-4xl text-2xl m-7 px-4 font-bold">
        Manage Your Profile
      </h2>
      <div className="m-4 p-4">
        <UserProfile routing="hash" />
      </div>
    </div>
    </div>
  );
}

export default Profile;
