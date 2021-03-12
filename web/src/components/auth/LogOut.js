const LogOut = (props) => {
    let setCurrentUser = props.setCurrentUser;

    const onLogOut = (e) => {
        e.preventDefault();
        fetch("https://bubbletask-r1.herokuapp.com/auth/log-out", {
            // fetch("http://localhost:8080/auth/log-out", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            // .then((data) => console.log(data))
            .then((data) => {
                setCurrentUser(data);
            })
            // ALSO CLEAR ANY USER DATA (IE WORKERS AND TASKS)
            .catch((error) => console.log("error", error));
    };

    return <button onClick={onLogOut}>log out</button>;
};

export default LogOut;
