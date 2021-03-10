const RowHeader = (props) => {
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
            <div>{props.task.name}</div>
        </th>
    );
};

export default RowHeader;
