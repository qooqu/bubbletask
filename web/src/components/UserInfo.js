const UserInfo = (props) => {
    let username = props.currentUser.username;
    return <div>{username ? username : "log in to save your work"}</div>;
};

export default UserInfo;
