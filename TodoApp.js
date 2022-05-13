import { useState } from "react";
import Swal from "sweetalert2";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { nanoid } from 'nanoid'

import Navbar from "./Navbar";


const TodoApp = () => {
    const [todo, setTodo] = useState('');
    const [allTodo, setAllTodo] = useState([])

    let myOjb = {
        todo: todo,
        dated: moment().format('DD-MMM-YYYY, h:mm: a'),
        id: nanoid(),
    }

    const addNewItem = (e) => {
        e.preventDefault();
        const copyCart = [...allTodo];
        copyCart.push(myOjb);
        setAllTodo(copyCart);
        document.getElementById('txt').value = '';

        Swal.fire(
            'Item Inserted Successfully!',
            'You clicked the button!',
            'success'
        )        
        //console.log(allTodo);
    };


    const notify = () => {
        toast.success('Item Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const DeleteTodo = (curcat) => {
        console.log('current', curcat);
        const newItem = allTodo.filter((newVal) => {
            return newVal.id !== curcat;
            // comparing category for displaying data
        });
        console.log('new', newItem);
        setAllTodo(newItem);
        notify();
    };



    return (
        <>
            <Navbar />


            <div className="container">
                <br/>
                <h3>Todo Application <span className="text-primary">(Items: {allTodo.length})</span></h3>
                <div className="row justify-content-md-center">
                    <div className="col col-md-5">
                        <form onSubmit={addNewItem}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="text" placeholder="Enter Todo" onChange={(e) => { setTodo(e.target.value) }} className="form-control" id="txt" aria-describedby="emailHelp" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                    <div className="col col-md-7">
                        {allTodo.map((mytodo, ind) => {
                            return (
                                <ol key={ind} className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{ind = ind + 1}. {mytodo.todo}</div>
                                            {mytodo.id}<br />
                                            {mytodo.dated}
                                        </div>
                                        <span onClick={() => DeleteTodo(mytodo.id)} className="badge bg-primary rounded-pill">X</span>
                                    </li>
                                </ol>
                            )
                        })}
                    </div>
                </div>
                <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />


            </div>
        </>
    )
}

export default TodoApp;