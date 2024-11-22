import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './calendarstyle.css';
import Sidebar from './taskflow-sidebar'; 
import './taskflow-styles.css';

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTasks, setFilteredTasks] = useState([]); 
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/tasks', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const tasks = await response.json();
          setTasks(tasks);
        } else {
          console.log('No tasks found.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.Deadline ? new Date(task.Deadline).toDateString() === selectedDate.toDateString() : false
    );
    setFilteredTasks(filtered);
  }, [selectedDate, tasks]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderTasksOnDate = ({ date }) => {
    const dateTasks = tasks.filter(
      (task) => task.Deadline && new Date(task.Deadline).toDateString() === date.toDateString()
    );

    return (
      dateTasks.length > 0 && (
        <div
          style={{
            backgroundColor: '#3498db',
            padding: '2px 5px',
            borderRadius: '5px',
            marginTop: '5px',
          }}
        >
          
        </div>
      )
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar onCategorySelect={() => { }} />

      <div className="flex-1 p-8 bg-gray-100">
        <div className="calendar-container flex flex-col items-center justify-content-center mx-auto" style={{ width: '80%' }}> {/* Center and set width to 80% */}
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={renderTasksOnDate} 
          />

          <h2 className="font-40 mt-6 font-semibold">Tasks for {selectedDate.toDateString()}</h2>
          <ul className="mt-4 ">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <li key={index} className="p-2 bg-white rounded mb-2 shadow" style={{fontSize:"30px"}}>
                  {task.description}
                </li>
              ))
            ) : (
              <p>No tasks for this day.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
