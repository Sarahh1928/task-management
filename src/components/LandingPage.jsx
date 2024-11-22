import React, { useState, useEffect } from 'react';
import Sidebar from './taskflow-sidebar'; 
import TaskList from './TaskList';
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]); 
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:4000/check-session', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, [navigate]);

  const toggleTaskCompletion = async (index) => {
    const task = tasks[index];
  
    if (task.completed) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/updatetask/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true, 
        }),
        credentials: 'include',
      });
  
      if (response.ok) {
        const updatedTasks = tasks.map((task, idx) =>
          idx === index ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      } else {
        console.error('Failed to update task completion');
      }
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/tasks', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 200) {
          const tasks = await response.json();
          const sortedTasks = tasks.sort((a, b) => {
            const dateA = a.Deadline ? new Date(a.Deadline) : new Date(8640000000000000);
            const dateB = b.Deadline ? new Date(b.Deadline) : new Date(8640000000000000);
            return dateA - dateB;
          });
          setTasks(sortedTasks); 
          setFilteredTasks(sortedTasks); 
        } else {
          console.log("No tasks found.");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    applyFilters(category, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(selectedCategory, query);
  };

  const applyFilters = (category, query) => {
    let filtered = tasks;

    if (category === 'active') {
      filtered = tasks.filter((task) => !task.completed);
    } else if (category === 'completed') {
      filtered = tasks.filter((task) => task.completed);
    } else if (category) {
      filtered = tasks.filter((task) => task.category === category);
    }

    if (query) {
      filtered = filtered.filter((task) =>
        task.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  const deleteTask = async (taskIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/deletetask/${taskIndex}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.ok) {
        const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
        setTasks(updatedTasks);
        applyFilters(selectedCategory, searchQuery); 
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar onCategorySelect={handleCategorySelect} searchQuery={searchQuery} onSearchChange={handleSearch} />

      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks found in this category.</p>
        ) : (
          <TaskList tasks={filteredTasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />  // Display tasks based on selected category
        )}
      </div>
    </div>
  );
};

export default TaskPage;
