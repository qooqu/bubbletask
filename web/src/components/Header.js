const Header = (props) => {
    let item = props.item;

    const onDragStart = (e) => {
        let dragData = {
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
        let fromID = dropData.id;
        let toID = item._id;
        props.onDrop(fromID, toID);
    };

    return (
        <th>
            <div
                draggable="true"
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className="grabbable"
            >
                {props.item.name}
            </div>
        </th>
    );
};

export default Header;
