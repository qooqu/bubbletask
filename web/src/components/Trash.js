const Trash = (props) => {
    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        let fromID = e.dataTransfer.getData("text");
        let toID = "trash";
        props.headerDrag("workers", fromID, toID);
    };

    return (
        <div onDragOver={onDragOver} onDrop={onDrop}>
            trash
        </div>
    );
};

export default Trash;
