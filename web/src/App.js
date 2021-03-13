import React, { useState, useEffect } from "react";
import uniqid from "uniqid";

import Nav from "./components/Nav";
import Header from "./components/Header";
import Bubble from "./components/Bubble";
import Form from "./components/Form";
import Trash from "./components/Trash";

import "./App.css";

const App = () => {
    const sandboxWorkers = [
        {
            _id: "111",
            name: "jack",
            owner: "nobody",
            order: 0,
            __v: 0,
        },
        {
            _id: "222",
            name: "jill",
            owner: "nobody",
            order: 1,
            __v: 0,
        },
    ];

    const sandboxTasks = [
        {
            _id: "333",
            name: "build",
            owner: "nobody",
            order: 0,
            assignedTo: "111",
            percentComplete: 25,
            __v: 0,
        },
        {
            _id: "444",
            name: "sell",
            owner: "nobody",
            order: 1,
            assignedTo: "222",
            percentComplete: 0,
            __v: 0,
        },
    ];

    const [currentUser, setCurrentUser] = useState({ username: null });
    const [workers, setWorkers] = useState([]);
    const [tasks, setTasks] = useState([]);

    let fetchData = () => {
        // let apiAddress = "https://bubbletask-r1.herokuapp.com/";
        // let apiAddress = "http://localhost:8080/";
        // `${apiAddress}/api/workers`

        fetch("https://bubbletask-r1.herokuapp.com/api/workers", {
            // fetch("http://localhost:8080/api/workers", {
            method: "GET",
            credentials: "include",
        })
            .then((data) => data.json())
            .then((data) => reOrder(data))
            .then((data) => {
                setWorkers(data);
            });

        fetch("https://bubbletask-r1.herokuapp.com/api/tasks", {
            // fetch("http://localhost:8080/api/tasks", {
            method: "GET",
            credentials: "include",
        })
            .then((data) => data.json())
            .then((data) => reOrder(data))
            .then((data) => {
                setTasks(data);
            });
    };

    useEffect(() => {
        if (currentUser.username) {
            fetchData();
        } else {
            setWorkers(sandboxWorkers);
            setTasks(sandboxTasks);
        }
    }, [currentUser]);

    const reOrder = (arr) => {
        let newArr = [...arr];
        newArr.sort((a, b) => a.order - b.order);
        return newArr;
    };

    const addWorker = (name) => {
        let newWorkers = [...workers];
        let newWorker = {
            _id: uniqid(),
            name: name,
            owner: "60473dbc8b20cf35e8ec8491",
            order: newWorkers.length,
        };
        newWorkers.push(newWorker);
        setWorkers(newWorkers);
    };

    const addTask = (name) => {
        let newTasks = [...tasks];
        let newTask = {
            _id: uniqid(),
            name: name,
            owner: "60473dbc8b20cf35e8ec8491",
            order: newTasks.length,
            assignedTo: "",
            percentComplete: 0,
        };
        newTasks.push(newTask);
        setTasks(newTasks);
    };

    const bubbleClick = (task) => {
        let newTasks = [...tasks];
        let index = newTasks.map((ele) => ele._id).indexOf(task._id);
        newTasks[index] = task;
        setTasks(newTasks);
    };

    const deleteWorker = (ID) => {
        let newWorkers = [...workers];
        let index = newWorkers.map((ele) => ele._id).indexOf(ID);
        newWorkers.splice(index, 1);
        // a deleted worker might be assigned to tasks
        let newTasks = [...tasks];
        newTasks.forEach((task) => {
            if (task.assignedTo === ID) {
                task.assignedTo = "";
                task.percentComplete = 0;
            }
        });
        setWorkers(newWorkers);
    };

    const deleteTask = (ID) => {
        let newTasks = [...tasks];
        let index = newTasks.map((ele) => ele._id).indexOf(ID);
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const onDrop = (fromID, toID) => {
        // figure out worker / task
        let which;
        let whichArr;
        if (workers.map((ele) => ele._id).indexOf(fromID) !== -1) {
            which = "workers";
            whichArr = [...workers];
        } else {
            which = "tasks";
            whichArr = [...tasks];
        }
        // if we're dropping it in the trash, delete it
        if (toID === "trash") {
            if (which === "workers") {
                deleteWorker(fromID);
            } else {
                deleteTask(fromID);
            }
        } else {
            // we're not dropping it in the trash
            // if we're dropping a worker on a task, ignore
            if (whichArr.map((ele) => ele._id).indexOf(toID) === -1) {
                return;
            } else {
                // execute the re-order
                // we know the array is already in order
                // get the indices of 'from' and 'to'
                // temp store the dragged item
                // remove it from the array
                // stick it in front of the 'to'
                // forEach to re-assign all eles 'order' based on new indices
                let fromIndex = whichArr.map((ele) => ele._id).indexOf(fromID);
                let toIndex = whichArr.map((ele) => ele._id).indexOf(toID);
                let draggedItem = whichArr[fromIndex];
                whichArr.splice(fromIndex, 1);
                whichArr.splice(toIndex, 0, draggedItem);
                whichArr.forEach((ele, index) => {
                    ele.order = index;
                });
                if (which === "workers") {
                    setWorkers(whichArr);
                } else {
                    setTasks(whichArr);
                }
            }
        }
    };

    return (
        <div className="App">
            <div id="container">
                <Nav
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                />
                {!currentUser.username ? (
                    <article>
                        <p>welcome to bubble task!</p>
                        <p>try it out in the sandbox below</p>
                        <p>sign up / log in to save your work</p>
                    </article>
                ) : null}
                <Form which="worker" handleSubmit={addWorker} />
                <Form which="task" handleSubmit={addTask} />
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Trash onDrop={onDrop} />
                            </th>
                            {workers.map((worker) => (
                                <Header
                                    key={"header-" + worker._id}
                                    item={worker}
                                    onDrop={onDrop}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={"tr-" + task._id}>
                                <Header
                                    key={"header-" + task._id}
                                    item={task}
                                    onDrop={onDrop}
                                />
                                {workers.map((worker) => (
                                    <Bubble
                                        key={
                                            "bubble-" +
                                            task._id +
                                            "-" +
                                            worker._id
                                        }
                                        worker={worker}
                                        task={task}
                                        handleClick={bubbleClick}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul id="howto">
                    <li>click a bubble to assign a task</li>
                    <li>keep clicking to track progress</li>
                    <li>each task can be assigned to only one worker</li>
                    <li>
                        to unassign a task, click until the bubble's full, then
                        click one more time
                    </li>
                    <li>drag and drop tasks and workers to re-order</li>
                    <li>you can also drag and drop to the trash</li>
                </ul>
            </div>
        </div>
    );
};

export default App;
