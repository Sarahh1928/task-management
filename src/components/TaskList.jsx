import React from 'react';
import { CheckSquare, Square, Trash2 } from 'lucide-react'; 

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-item flex items-center justify-between bg-white p-3 mb-2 rounded-lg shadow-sm">
          <div className="flex items-center">
            
            <button
              onClick={() => toggleTaskCompletion(index)}
              className="mr-3"
              disabled={task.completed} 
            >
              {task.completed ? (
                <CheckSquare size={24} className="text-green-500" />
              ) : (
                <Square size={24} />
              )}
            </button>
            
            <div className="task-details">
              <p className={`text-gray-800 ${task.completed ? 'line-through' : ''}`}>
                {task.description}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {task.category && (
              <span className="text-sm text-blue-500 mr-3">{task.category}</span>
            )}
          </div>
          
          <div className="flex items-center">
            {task.Deadline && (
              <>
                <span className="text-sm text-blue-500 mr-3">
                  {new Date(task.Deadline).toLocaleDateString()}
                </span>
                <span className="text-sm text-blue-500">
                  {new Date(task.Deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </>
            )}
          </div>
          
          <button onClick={() => deleteTask(index)} className="ml-4 text-red-500">
            <Trash2 size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
