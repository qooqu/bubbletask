const ColumnHeader = (props) => {
    // deleteThisWorker() {
    //     Meteor.call('workers.remove', this.props.worker._id);
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
    //     Meteor.call('workers.dragDrop', oldSpot, newSpot);
    // }

    return (
        <th>
            <div>{props.worker.name}</div>
        </th>
    );
};

export default ColumnHeader;
