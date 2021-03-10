import React, { useState, useEffect } from "react";

import ColumnHeader from "./ColumnHeader";
import RowHeader from "./RowHeader";
import Bubble from "./Bubble";

import "./App.css";

const App = () => {
    const [data, setData] = useState({
        workers: [],
        tasks: [],
    });

    useEffect(() => {
        loadItems();
    }, []);

    const tempData = {
        workers: [
            {
                _id: "604744bad7510a5ac835101f",
                name: "davey",
                owner: "60473dbc8b20cf35e8ec8491",
                order: 24,
                __v: 0,
            },
            {
                _id: "6047b8138c88a60004eff1a9",
                name: "alfie",
                owner: "60473dbc8b20cf35e8ec8491",
                order: 13,
                __v: 0,
            },
        ],
        tasks: [
            {
                _id: "604749e763685d53586e4c21",
                name: "hi ho hi ho",
                owner: "60473dbc8b20cf35e8ec8491",
                order: 12,
                assignedTo: "6047b8138c88a60004eff1a9",
                percentComplete: 25,
                __v: 0,
            },
            {
                _id: "6047badd8c88a60004eff1ab",
                name: "do this",
                owner: "60473dbc8b20cf35e8ec8491",
                order: 4356,
                assignedTo: "604744bad7510a5ac835101f",
                percentComplete: 0,
                __v: 0,
            },
        ],
    };

    // const loadItems = async () => {
    const loadItems = () => {
        // if (!localStorage.bubbleTaskData) {
        //     localStorage.setItem("bubbleTaskData", JSON.stringify(tempData));
        // }
        // setData(JSON.parse(localStorage.bubbleTaskData));
        setData(tempData);
    };

    const bubbleClick = function (task) {
        let newTasks = [...data.tasks];
        let index = newTasks.map((ele) => ele._id).indexOf(task._id);
        newTasks[index] = task;
        let newData = tempData;
        newData.tasks = newTasks;
        setData(newData);
    };

    // const fetchData = async () => {
    //     let newData = {};

    //     fetch data

    //     localStorage.setItem("bubbleTaskData", JSON.stringify(newData));
    //     setData(newData);
    // };

    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {data.workers.map((worker) => (
                            <ColumnHeader worker={worker} />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.tasks.map((task) => (
                        <tr>
                            <RowHeader key={task.id} task={task} />
                            {data.workers.map((worker) => (
                                <Bubble
                                    key={task.id + worker.id}
                                    worker={worker}
                                    task={task}
                                    handleClick={bubbleClick}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
