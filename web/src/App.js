import React, { useState, useEffect } from "react";
import uniqid from "uniqid";

import Header from "./components/Header";
import Bubble from "./components/Bubble";
import Form from "./components/Form";
import Trash from "./components/Trash";

import "./App.css";

const App = () => {
    const tempData = {
        workers: [
            {
                _id: "604744bad7510a5ac835101f",
                name: "jack",
                owner: "60473dbc8b20cf35e8ec8491",
                order: 2,
                __v: 0,
            },
            {
                _id: "6047b8138c88a60004eff1a9",
                name: "jill",
                owner: "60473dbc8b20cf35e8ec8491",
                order: 1,
                __v: 0,
            },
        ],
        tasks: [
            {
                _id: "604749e763685d53586e4c21",
                name: "build",
                owner: "60473dbc8b20cf35e8ec8491",
                order: 2,
                assignedTo: "6047b8138c88a60004eff1a9",
                percentComplete: 25,
                __v: 0,
            },
            {
                _id: "6047badd8c88a60004eff1ab",
                name: "sell",
                owner: "60473dbc8b20cf35e8ec8491",
                order: 1,
                assignedTo: "604744bad7510a5ac835101f",
                percentComplete: 0,
                __v: 0,
            },
        ],
    };

    const [data, setData] = useState({
        workers: [],
        tasks: [],
    });

    // don't need async yet, but i think this set up will be handy when i link it to the api
    useEffect(() => {
        let fetchData = async () => tempData;
        let initState = async () => {
            let fetchedData = await fetchData();
            reOrder(fetchedData);
        };
        initState();
    }, []);

    const reOrder = (fetchedData) => {
        let newData = {
            workers: [...fetchedData.workers],
            tasks: [...fetchedData.tasks],
        };
        for (let key in newData) {
            newData[key].sort((a, b) => a.order - b.order);
        }
        setData(newData);
    };

    const formSubmit = (which, name) => {
        let newData = {
            workers: [...data.workers],
            tasks: [...data.tasks],
        };
        let newItem;
        if (which === "worker") {
            newItem = {
                _id: uniqid(),
                name: name,
                owner: "60473dbc8b20cf35e8ec8491",
                order: newData[`${which}s`].length,
            };
        } else {
            newItem = {
                _id: uniqid(),
                name: name,
                owner: "60473dbc8b20cf35e8ec8491",
                order: newData[`${which}s`].length,
                assignedTo: "",
                percentComplete: 0,
            };
        }
        newData[`${which}s`].push(newItem);
        setData(newData);
    };

    const bubbleClick = (task) => {
        let newData = { workers: [...data.workers], tasks: [...data.tasks] };
        let index = newData.tasks.map((ele) => ele._id).indexOf(task._id);
        newData.tasks[index] = task;
        setData(newData);
    };

    const deleteHeader = (whichs, itemID) => {
        let newData = {
            workers: [...data.workers],
            tasks: [...data.tasks],
        };
        let index = newData[whichs].map((ele) => ele._id).indexOf(itemID);
        newData[whichs].splice(index, 1);
        // if a deleted worker might be assigned to tasks
        if (whichs === "workers") {
            newData.tasks.forEach((task) => {
                if (task.assignedTo === itemID) {
                    task.assignedTo = "";
                    task.percentComplete = 0;
                }
            });
        }
        setData(newData);
    };

    const onDrop = (which, fromID, toID) => {
        let whichs = `${which}s`;
        if (toID === "trash") {
            deleteHeader(whichs, fromID);
        } else {
            // if the headers are getting dragged around, we know the array has already been re-ordered
            // get the indices of 'from' and 'to'
            // temp store the dragged item
            // remove the item from the array
            // stick the item in front of the 'to'
            // forEach to re-assign all eles 'order' based on new array indices
            let newData = {
                workers: [...data.workers],
                tasks: [...data.tasks],
            };
            let fromIndex = newData[whichs]
                .map((ele) => ele._id)
                .indexOf(fromID);
            let toIndex = newData[whichs].map((ele) => ele._id).indexOf(toID);
            let draggedItem = newData[whichs][fromIndex];
            newData[whichs].splice(fromIndex, 1);
            newData[whichs].splice(toIndex, 0, draggedItem);
            newData[whichs].forEach((ele, index) => {
                ele.order = index;
            });
            setData(newData);
        }
    };

    return (
        <div className="App">
            <Form which="worker" formSubmit={formSubmit} />
            <Form which="task" formSubmit={formSubmit} />
            <table>
                <thead>
                    <tr>
                        <th key={"hi"}></th>
                        {data.workers.map((worker) => (
                            <Header
                                key={worker._id}
                                which="worker"
                                item={worker}
                                onDrop={onDrop}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.tasks.map((task) => (
                        <tr key={"tr" + task._id}>
                            <Header
                                key={task._id}
                                which="task"
                                item={task}
                                onDrop={onDrop}
                            />
                            {data.workers.map((worker) => (
                                <Bubble
                                    key={task._id + "-" + worker._id}
                                    worker={worker}
                                    task={task}
                                    handleClick={bubbleClick}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Trash onDrop={onDrop} />
            <ul>
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
    );
};

export default App;
