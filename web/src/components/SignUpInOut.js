const SignUpInOut = (props) => {
    // const onSignUp = (e) => {
    //     e.preventDefault();
    //     props.signUp(e.target.username, e.target.password);
    // };
    // const onSignIn = () => {};
    // const onLogOut = () => {};

    const onSignIn = (e) => {
        e.preventDefault();
        console.log(e.target);
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
        };

        fetch(
            "https://bubbletask-r1.herokuapp.com/auth/log-in/",
            requestOptions
        )
            .then((response) => response.text())
            // .then((result) => console.log(result))
            .then((responseText) => console.log(responseText))
            .then(
                fetch("https://bubbletask-r1.herokuapp.com/api/tasks", {
                    method: "GET",
                    withCredentials: true,
                    // credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
            );

        // .catch((error) => console.log("error", error));
    };

    return (
        <>
            {/* <form onSubmit={onSignUp}>
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
            </form> */}
            <form onSubmit={onSignIn}>
                {/* <form
                action="https://bubbletask-r1.herokuapp.com/auth/log-in/"
                method="POST"
            > */}
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
                <button>Sign In</button>
            </form>
            {/* <form onSubmit={onLogOut}>
                <button>Log Out</button>
            </form> */}
        </>
    );
};

export default SignUpInOut;
