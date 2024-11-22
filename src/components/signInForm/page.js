import { Link, useNavigate } from "react-router-dom";
import styles from "./page.module.css"
import logo from "../../images/logo.svg"
import { useState } from "react";
function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleSignin(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                credentials: 'include',  
                body: JSON.stringify({
                    email,  
                    password,
                }),
            });
    
            if (response.ok) {
                // alert('Signin successful!');
                navigate('/'); 
            } else if (response.status === 400) {
                // alert('Invalid credentials');
            } else {
                // alert('Signin failed');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // alert('Email or password is wrong');
            } else {
                // alert('Signup failed');
            }
        }
    }
    return (

        <div>
            <div className={styles.main} >
                <div className={styles.topPage}>
                    <h2>Sign into Your Account</h2>
                    <form onSubmit={handleSignin}>
                        <label htmlFor="Email">Email</label>
                        <input type="email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />


                        <div className={styles.checkBox}>
                            <input id="checkbox" type="checkbox" />
                            <label htmlFor="checkbox">Remember me.</label>
                        </div>
                        <button type="submit" className={styles.btn}>Sign In</button>

                        <p>New User? <Link className={styles.link} to="/signUp" >Create an Account</Link></p>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default SignIn;