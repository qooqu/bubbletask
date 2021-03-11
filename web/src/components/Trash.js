const Trash = (props) => {
    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        let dropDataJSON = e.dataTransfer.getData("text");
        let dropData = JSON.parse(dropDataJSON);
        let which = dropData.which;
        let fromID = dropData.id;
        let toID = "trash";
        props.onDrop(which, fromID, toID);
    };

    return (
        <div onDragOver={onDragOver} onDrop={onDrop}>
            <i className="fa fa-trash-o" style={{ fontSize: "2rem" }}></i>
        </div>
    );
};

export default Trash;
