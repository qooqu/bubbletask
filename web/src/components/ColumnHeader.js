const ColumnHeader = (props) => {
    let worker = props.worker;
    // deleteThisWorker() {
    //     Meteor.call('workers.remove', this.props.worker._id);
    // }

    const onDragStart = (e) => {
        e.dataTransfer.setData("text", worker._id);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        let fromID = e.dataTransfer.getData("text");
        let toID = worker._id;
        props.headerDrag("workers", fromID, toID);
    };

    return (
        <th>
            <div
                draggable="true"
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                {props.worker.name}
            </div>
        </th>
    );
};

export default ColumnHeader;
