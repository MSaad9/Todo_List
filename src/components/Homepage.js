import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "../firebase.js"
import { useNavigate } from 'react-router-dom';
export default function Homepage() {
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((err) => { alert(err.message); });
    };
    return (
        <div>
            <h1>Your Todo List</h1>
            <button onClick={handleSignOut}>Signout</button>
        </div>
    )
}
