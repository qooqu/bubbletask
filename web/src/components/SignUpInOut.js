const SignUpInOut = (props) => {
    const onSignUp = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", e.target.username.value);
        urlencoded.append("password", e.target.password.value);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
            credentials: "include",
        };

        fetch(
            "https://bubbletask-r1.herokuapp.com/auth/sign-up/",
            // "http://localhost:8080/auth/sign-up/",
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                props.setCurrentUser(data);
            })
            .catch((error) => console.log("error", error));
    };

    const onSignIn = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", e.target.username.value);
        urlencoded.append("password", e.target.password.value);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
            credentials: "include",
        };

        fetch(
            "https://bubbletask-r1.herokuapp.com/auth/log-in/",
            // "http://localhost:8080/auth/log-in/",
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                props.setCurrentUser(data);
            })
            .catch((error) => console.log("error", error));
    };

    const getStuff = (e) => {
        e.preventDefault();

        fetch("https://bubbletask-r1.herokuapp.com/api/tasks", {
            // fetch("http://localhost:8080/api/tasks", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log("error", error));
    };

    const onLogOut = (e) => {
        e.preventDefault();
        fetch("https://bubbletask-r1.herokuapp.com/api/tasks", {
            // fetch("http://localhost:8080/auth/log-out", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            // .then((data) => console.log(data))
            .then((data) => {
                props.setCurrentUser(data);
            })
            .catch((error) => console.log("error", error));
    };

    const test = () => {
        props.setCurrentUser({ username: "dave" });
    };

    return (
        <>
            <form onSubmit={onSignUp}>
                <label htmlFor="username">
                    <input
                        id="username"
                        name="username"
                        placeholder="username"
                        type="text"
                    />
                </label>
                <label htmlFor="password">
                    <input
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                </label>
                <button>Sign Up</button>
            </form>
            <form onSubmit={onSignIn}>
                <label htmlFor="username">
                    <input
                        id="username"
                        name="username"
                        placeholder="username"
                        type="text"
                    />
                </label>
                <label htmlFor="password">
                    <input
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                </label>
                <button>Log In</button>
            </form>
            <form onSubmit={onLogOut}>
                <button>Log Out</button>
            </form>
            <form onSubmit={getStuff}>
                <button>Get Stuff</button>
            </form>
            <button onClick={test}>test</button>
        </>
    );
};

export default SignUpInOut;