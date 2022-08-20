import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from 'react-router-dom';
import './welcome.css'
import TodoSVG from '../static/login_background.svg'



export default function Welcome() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPasssword: ""
    });

    // if user is signed in we want to keep them on homepage 
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/homepage")
            }
        });
    }, []);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (p) => {
        setPassword(p.target.value);
    }

    // if user has given correct email password take them to their homepage 
    // else show them error 
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate('/homepage')
        }).catch((err) => alert(err.message));
    }
    const handleRegister = () => {
        if (registerInformation.email != registerInformation.confirmEmail) {
            alert("Email does not match")
            return
        } else if (registerInformation.password != registerInformation.confirmPasssword) {
            alert("Password does not match")
            return
        }
        createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password).then(() => {
            navigate('/homepage');
        })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="welcome">
            <img src={TodoSVG} className="todo-svg" />
            <h1>Todo List</h1>

            {isRegistering ? (
                <>
                    <div className="register-container">
                        <h2 class="fw-bold mb-2 text-uppercase">Sign Up Now</h2>
                        <input type="email" placeholder='Email' value={registerInformation.email}
                            onChange={(e) => setRegisterInformation({ ...registerInformation, email: e.target.value })} />
                        <input type="email" placeholder='Confirm Email' value={registerInformation.confirmEmail}
                            onChange={(e) => setRegisterInformation({ ...registerInformation, confirmEmail: e.target.value })} />
                        <input type="password" placeholder='Password' value={registerInformation.password}
                            onChange={(p) => setRegisterInformation({ ...registerInformation, password: p.target.value })} />
                        <input type="password" placeholder='Confirm Password' value={registerInformation.confirmPasssword}
                            onChange={(p) => setRegisterInformation({ ...registerInformation, confirmPasssword: p.target.value })} />
                        <div className='register-button'>
                            <button class="btn btn-dark btn-lg btn-block" onClick={handleRegister}>Register</button>
                        </div>
                        <button className="create-account-button" onClick={() => setIsRegistering(false)}>Go Back</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='login-container'>
                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                        <p class="fw-normal mb-3 pb-3" >Please enter your login and password!</p>
                        <input class="form-label" type="email" placeholder='Email' onChange={handleEmailChange} value={email} />
                        <input class="form-label" type="password" placeholder='Password' onChange={handlePasswordChange} value={password} />
                        <div className="sign-in-button">
                            <button class="btn btn-dark btn-lg btn-block" onClick={handleSignIn}>Sign In</button>
                        </div>
                        <button className="create-account-button" onClick={() => setIsRegistering(true)}> Create an account </button>
                    </div>
                </>
            )}


        </div>

    );
}
