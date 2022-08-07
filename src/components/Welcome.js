import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // if user is signed in we want to keep them on homepage 
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/homepage")
            }
        });
    }, []);


    const handleEmailChange = (email) => {
        setEmail(email.target.value);
    }

    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    }

    // if user has given correct email password take them to their homepage 
    // else show them error 
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/homepage')
        }).catch((err) => alert(err.message));
    }

    return (
        <div className="welcome">
            <h1>Todo List</h1>
            <div className="login-container">
                <input type="email" onChange={handleEmailChange} value={email} />
                <input type="password" onChange={handlePasswordChange} value={password} />
                <button onClick={handleSignIn}>Sign In</button>
                <a href=""> Create an account</a>
            </div>

        </div>

    )
}
