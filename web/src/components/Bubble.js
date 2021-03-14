const Bubble = (props) => {
    let worker = props.worker;
    let task = props.task;

    const assignClass = () => {
        if (worker._id === task.assignedTo) {
            switch (props.task.percentComplete) {
                case 0:
                    return "bubble bubble-00";
                case 25:
                    return "bubble bubble-25";
                case 50:
                    return "bubble bubble-50";
                case 75:
                    return "bubble bubble-75";
                case 100:
                    return "bubble bubble-100";
                default:
                    return "bubble bubble-na";
            }
        }
        return "bubble bubble-na";
    };

    // note the 'double arrow function' returns a function
    // this lets you use arguments in the onClick definition without firing the function
    const handleClick = () => () => {
        if (task.assignedTo === "" || !task.assignedTo) {
            task.assignedTo = worker._id;
            task.percentComplete = 0;
        } else if (task.assignedTo === worker._id) {
            // if the task is already finished, unassign the task
            if (task.percentComplete > 75) {
                task.assignedTo = "";
                task.percentComplete = 0;
            } else {
                task.percentComplete += 25;
            }
        }
        props.handleClick(task);
    };

    return (
        <td>
            <div
                className={assignClass()}
                onClick={handleClick()}
                style={{ cursor: "pointer" }}
            ></div>
        </td>
    );
};

export default Bubble;
