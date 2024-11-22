import styles from "./signup.module.css";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // If you're using axios

function Signup() {
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [passMsg, setPassMsg] = useState("");
    const refs = useRef([]);
    const navigate = useNavigate(); // For redirection after successful signup

    function handlePass(e) {
        const password = e.target.value;
        setPass(password);

        let F1 = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password); // Special character
        let F2 = password.length >= 8; // Min length
        let F3 = /[A-Z]/.test(password); // At least one uppercase letter
        let F4 = /[0-9]/.test(password); // At least one digit

        if (F1 && F2 && F3 && F4) {
            setPassMsg("😃 Awesome! You have a secure password.");
            refs.current.forEach(ref => {
                if (ref) ref.className = styles.lineActive;
            });
        } else {
            setPassMsg(""); // Clear message if conditions not met
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        try {
            const password=pass;
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                credentials: 'include',  
                body: JSON.stringify({
                    username,  
                    email,
                    password,
                }),
            });
            
            if (response.status === 201) {
                // alert('Signup successful!');
                navigate('/signin'); // Redirect to sign-in page
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // alert('User already exists');
            } else {
                // alert('Signup failed');
            }
        }
    }

    return (
        <div>
            <div className={styles.main}>
                <div className={styles.topPage}>
                    <h2>Sign up</h2>
                    <form onSubmit={handleSignup}>
                        <label htmlFor="Name">Full Name</label>
                        <input type="text" id="Name" placeholder="Enter your full name"
                            value={username} onChange={(e) => setUsername(e.target.value)} />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email"
                            value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="pass">Password</label>
                        <input type="password" id="pass" placeholder="Enter your password"
                            value={pass} onChange={handlePass} />

                        <div className={styles.lines}>
                            <div ref={el => refs.current[0] = el} className={styles.line}></div>
                            <div ref={el => refs.current[1] = el} className={styles.line}></div>
                            <div ref={el => refs.current[2] = el} className={styles.line}></div>
                            <div ref={el => refs.current[3] = el} className={styles.line}></div>
                        </div>
                        <div className={styles.passmsg}>{passMsg}</div>

                        <div className={styles.checkBox}>
                            <input id="checkbox" type="checkbox" />
                            <label htmlFor="checkbox">I agree to the Terms of Service and Privacy Policy.</label>
                        </div>
                        <button type="submit" className={styles.btn}>Create Account</button>
                        <p>Already have an Account? <Link className={styles.link} to="/signin">Sign in</Link></p>

                    
                    </form>
                </div>
            </div>
           
        </div>
    );
}

export default Signup;
