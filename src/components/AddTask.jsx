import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaskForm.css";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/addtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  
        body: JSON.stringify({
          description: task,
          Deadline: time,
          category,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log("Task added:", data.task);
      } else {
        console.log("Error:", data.msg);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
    setTask("");
    setCategory("");
    setTime("");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="task-box p-4 shadow-sm rounded">
        <h2 className="text-center mb-4">Create a Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="task">What is to be done:</label>
            <input
              type="text"
              className="form-control"
              id="task"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category">Category:</label>
            <select
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="time">Deadline date:</label>
            <input
              type="date"
              className="form-control"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark save-btn">
              Save
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default TaskForm;
