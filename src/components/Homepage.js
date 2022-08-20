import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../firebase.js"
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import './homepage.css'
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
// import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
export default function Homepage() {
    const navigate = useNavigate();
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState('')
    // if user is not signed in they can't go to homepage/todo list page
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                });
            }
            else if (!user) {
                navigate('/')
            }
        })
    }, [])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // add
    const writeToDatabase = () => {
        const uidd = uid();
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        });

        setTodo("");
    };

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };



    // update
    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    };


    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd
        });

        setTodo("");
        setIsEdit(false);
    };

    return (
        <div className='homepage'>
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card" id="list1">
                        <div className='todos'>
                            <div class="card-body py-4 px-4 px-md-5">
                                <div class="text-center pt-3 pb-2">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                                        alt="Check" width="60"></img>

                                    <h2 class="my-4">Todo List</h2>
                                </div>


                                <input
                                    className="add-edit-input"
                                    type="text"
                                    placeholder="Add todo..."
                                    value={todo}
                                    onChange={(e) => setTodo(e.target.value)}
                                />
                                {todos.map((todo) => (
                                    <div className="todo">
                                        <h1>{todo.todo}</h1>
                                        <EditIcon
                                            fontSize="medium"
                                            onClick={() => handleUpdate(todo)}
                                            className="edit-button"
                                        />
                                        <DeleteIcon
                                            fontSize="medium"
                                            onClick={() => handleDelete(todo.uidd)}
                                            className="delete-button"
                                        />
                                    </div>
                                ))}

                                {isEdit ? (
                                    <div>
                                        <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon" />
                                    </div>
                                ) : (
                                    <div>
                                        <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
                                    </div>
                                )}
                                <div className='logout-icon'>
                                    <button onClick={handleSignOut} type="button" class="btn btn-default btn-sm">
                                        <span class="glyphicon glyphicon-log-out"></span> Log out
                                    </button>
                                </div>


                            </div>

                        </div>
                        {/* <ExitToAppTwoToneIcon  className="logout-icon" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
