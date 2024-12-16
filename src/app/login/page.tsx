"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
    const router = useRouter();
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false); // Reset error state

        try {
            // Send POST request for login
            const response = await axios.post('https://assignmentnestjs.onrender.com/auth/login', {
                username: input.username,
                password: input.password
            });

            // If the response contains a token, store it and redirect
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);  // Save JWT token in localStorage
                router.push('/dashboard');  // Redirect to dashboard or another protected route
            } else {
                setError(true);  // Show error if login is unsuccessful
            }
        } catch (err) {
            setError(true);  // Show error if there's a problem with the request
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='loginBody'>
                <form onSubmit={handleSubmit}>
                    <div className="login">
                        <div className="header mb-3">Login</div>
                        <div className="content">
                            Sign in to your account
                        </div>
                        <div className='input-containter'>
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
                    </div>
                    <input type="text" name='username' onChange={handleInput} placeholder='input username' required />
                </div>
                

                <div className='input-containter'>
                    <div>
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/remitting-country-linear-icon/password-148.png" alt="" />
                    </div>
                    <input type="password" name='password' onChange={handleInput} placeholder='input password' required />
                </div>
                        {error && <div className="error">Incorrect credentials, please try again.</div>}

                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
