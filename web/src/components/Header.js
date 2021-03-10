const Header = (props) => {
    let which = props.which;
    let item = props.item;

    const onDragStart = (e) => {
        let dragData = {
            which: which,
            id: item._id,
        };
        e.dataTransfer.setData("text", JSON.stringify(dragData));
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        let dropDataJSON = e.dataTransfer.getData("text");
        let dropData = JSON.parse(dropDataJSON);
        let which = dropData.which;
        let fromID = dropData.id;
        let toID = item._id;
        props.onDrop(which, fromID, toID);
    };

    return (
        <th>
            <div
                draggable="true"
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                {props.item.name}
            </div>
        </th>
    );
};

export default Header;
