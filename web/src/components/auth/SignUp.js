import React, { useState } from "react";

const SignUp = (props) => {
    let apiAddress = `${props.apiAddress}/auth/sign-up`;
    let setCurrentUser = props.setCurrentUser;
    let setWhich = props.setWhich;

    const [message, setMessage] = useState(null);

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

        fetch(apiAddress, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setCurrentUser(data);
                    setMessage(null);
                    setWhich(null);
                } else {
                    setMessage(data.message);
                }
            })
            .catch((error) => console.log("error", error));
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
                        autoFocus
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
                <button>sign up</button>
            </form>
            {message ? <div>{message}</div> : null}
        </>
    );
};

export default SignUp;
