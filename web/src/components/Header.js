const Header = (props) => {
    let which = props.which;
    let item = props.item;

    const onDragStart = (e) => {
        e.dataTransfer.setData("text", item._id);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        let fromID = e.dataTransfer.getData("text");
        let toID = item._id;
        props.headerDrag(which, fromID, toID);
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
