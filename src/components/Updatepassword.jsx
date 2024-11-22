import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaskForm.css"; 
import styles from "./signupForm/signup.module.css";
import axios from 'axios'; 

const TaskForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newpass, setNewPassword] = useState("");
    const [passMsg, setPassMsg] = useState("");
    const refs = useRef([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/changepassword', {
                email,
                currentpassword: password,
                newpassword: newpass
            }, { withCredentials: true });

            if (response.status === 200) {
                setPassMsg(response.data.msg);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setPassMsg(err.response.data.msg);
            } else {
                setPassMsg("Server error");
            }
        }
        setEmail("");
        setPassword("");
        setNewPassword("");
    };

    function handlePass(e) {
        const password = e.target.value;
        setNewPassword(password);

        let F1 = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password);
        let F2 = password.length >= 8;
        let F3 = /[A-Z]/.test(password); 
        let F4 = /[0-9]/.test(password); 

        if (F1 && F2 && F3 && F4) {
            setPassMsg("😃 Awesome! You have a secure password.");
            refs.current.forEach(ref => {
                if (ref) ref.className = styles.lineActive;
            });
        } else {
            setPassMsg(""); 
        }
    }
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="task-box p-4 shadow-sm rounded">
                <h2 className="text-center mb-4">Change your Password</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">Current Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Current Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="newpass">New Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newpass"
                            placeholder="Enter New Password"
                            value={newpass}
                            onChange={handlePass}
                        />
                    </div>

                    <div className={styles.passmsg}>{passMsg}</div>
                    
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark save-btn">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
