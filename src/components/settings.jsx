import React from 'react';
import Sidebar from './taskflow-sidebar';
import UpdatePassword from './Updatepassword'; 
import './LandingPage.css'; 

const Settings = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100">
        <UpdatePassword />
      </div>
    </div>
  );
};

export default Settings;
