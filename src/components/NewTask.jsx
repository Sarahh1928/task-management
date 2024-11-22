import React from 'react';
import Sidebar from './taskflow-sidebar';
import TaskForm from './AddTask';
import './LandingPage.css'; 

const TaskPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100">
        <TaskForm />
      </div>
    </div>
  );
};

export default TaskPage;
