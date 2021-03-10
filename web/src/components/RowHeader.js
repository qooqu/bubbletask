const RowHeader = (props) => {
    let task = props.task;
    const onDragStart = (e) => {
        e.dataTransfer.setData("text", task._id);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        let fromID = e.dataTransfer.getData("text");
        let toID = task._id;
        props.headerDrag("tasks", fromID, toID);
    };

    // deleteThisTask() {
    //     Meteor.call('tasks.remove', this.props.task._id);
    // }

    // drag(event) {
    //     event.dataTransfer.setData("text", event.target.id);
    // }

    // allowDrop(event) {
    //     event.preventDefault();
    // }

    // drop(event) {
    //     event.preventDefault();
    //     var oldSpot = parseInt(event.dataTransfer.getData("text"));
    //     var newSpot = parseInt(event.target.id);
    //     Meteor.call('tasks.dragDrop', oldSpot, newSpot);
    // }

    return (
        <th>
            <div
                draggable="true"
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                {props.task.name}
            </div>
        </th>
    );
};

export default RowHeader;
