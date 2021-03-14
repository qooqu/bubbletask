import React, { useState, useEffect } from "react";
import uniqid from "uniqid";

import Nav from "./components/Nav";
import Header from "./components/Header";
import Bubble from "./components/Bubble";
import Form from "./components/Form";
import Trash from "./components/Trash";

import "./App.css";

const App = () => {
    let apiAddress = "https://bubbletask-r1.herokuapp.com";
    // let apiAddress = "http://localhost:8080";

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
        fetch(`${apiAddress}/api/workers`, {
            method: "GET",
            credentials: "include",
        })
            .then((data) => data.json())
            .then((data) => reOrder(data))
            .then((data) => {
                setWorkers(data);
            });

        fetch(`${apiAddress}/api/tasks`, {
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
        let owner = currentUser.username ? currentUser.id : "nobody";
        let newWorker = {
            _id: uniqid(),
            name: name,
            owner: owner,
            order: newWorkers.length,
        };
        newWorkers.push(newWorker);
        setWorkers(newWorkers);

        if (currentUser.username) {
            var myHeaders = new Headers();
            myHeaders.append(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("name", newWorker.name);
            urlencoded.append("order", newWorker.order);

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow",
                credentials: "include",
            };

            fetch(`${apiAddress}/api/workers`, requestOptions)
                .then((data) => data.json())
                .then((data) => {
                    newWorkers[newWorkers.length - 1]._id = data._id;
                    setWorkers(newWorkers);
                });
        }
    };

    const addTask = (name) => {
        let newTasks = [...tasks];
        let owner = currentUser.username ? currentUser.id : "nobody";
        let tempID = uniqid();
        let newTask = {
            _id: tempID,
            name: name,
            owner: owner,
            order: newTasks.length,
            assignedTo: "",
            percentComplete: 0,
        };
        newTasks.push(newTask);
        setTasks(newTasks);

        if (currentUser.username) {
            var myHeaders = new Headers();
            myHeaders.append(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("name", newTask.name);
            urlencoded.append("order", newTask.order);
            urlencoded.append("assignedTo", newTask.assignedTo);
            urlencoded.append("percentComplete", newTask.percentComplete);

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow",
                credentials: "include",
            };

            fetch(`${apiAddress}/api/tasks`, requestOptions)
                .then((data) => data.json())
                .then((data) => {
                    newTasks[newTasks.length - 1]._id = data._id;
                    setTasks(newTasks);
                    // the below seems more correct, but it doesn't work
                    // let newNewTasks = [...tasks];
                    // let index = newNewTasks
                    //     .map((ele) => ele._id)
                    //     .indexOf(tempID);
                    // newNewTasks[index]._id = data._id;
                    // setTasks(newNewTasks);
                });
        }
    };

    const updateTask = (ID) => {
        let index = tasks.map((ele) => ele._id).indexOf(ID);
        let task = tasks[index];

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("name", task.name);
        urlencoded.append("order", task.order);
        urlencoded.append("assignedTo", task.assignedTo);
        urlencoded.append("percentComplete", task.percentComplete);

        let requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
            credentials: "include",
        };
        fetch(`${apiAddress}/api/tasks/${task._id}`, requestOptions);
    };

    const updateWorker = (ID) => {
        let index = workers.map((ele) => ele._id).indexOf(ID);
        let worker = workers[index];

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("name", worker.name);
        urlencoded.append("order", worker.order);

        let requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
            credentials: "include",
        };
        fetch(`${apiAddress}/api/workers/${worker._id}`, requestOptions);
    };

    const bubbleClick = (task) => {
        let newTasks = [...tasks];
        let index = newTasks.map((ele) => ele._id).indexOf(task._id);
        newTasks[index] = task;
        setTasks(newTasks);

        if (currentUser.username) {
            updateTask(task._id);
        }
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

        if (currentUser.username) {
            var myHeaders = new Headers();
            myHeaders.append(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("id", ID);

            var requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow",
                credentials: "include",
            };

            fetch(`${apiAddress}/api/workers/${ID}`, requestOptions);
        }
    };

    const deleteTask = (ID) => {
        let newTasks = [...tasks];
        let index = newTasks.map((ele) => ele._id).indexOf(ID);
        newTasks.splice(index, 1);
        setTasks(newTasks);

        if (currentUser.username) {
            var myHeaders = new Headers();
            myHeaders.append(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );

            var urlencoded = new URLSearchParams();
            urlencoded.append("id", ID);

            var requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow",
                credentials: "include",
            };

            fetch(`${apiAddress}/api/tasks/${ID}`, requestOptions);
        }
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
                    whichArr.forEach((ele) => {
                        updateWorker(ele._id);
                    });
                } else {
                    setTasks(whichArr);
                    whichArr.forEach((ele) => {
                        updateTask(ele._id);
                    });
                }
            }
        }

        // fetch update many / 'which'
    };

    return (
        <div className="App">
            <div id="container">
                <Nav
                    apiAddress={apiAddress}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    fetchData={fetchData}
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
