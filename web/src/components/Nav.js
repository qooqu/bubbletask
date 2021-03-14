import React, { useState } from "react";
import SignUp from "./auth/SignUp";
import LogIn from "./auth/LogIn";
import LogOut from "./auth/LogOut";

const Nav = (props) => {
    let apiAddress = props.apiAddress;
    let currentUser = props.currentUser;
    let setCurrentUser = props.setCurrentUser;
    let fetchData = props.fetchData;

    const [which, setWhich] = useState(null);

    const onClick = (e) => {
        e.preventDefault();
        let which = e.target.dataset.which;
        setWhich(which);
    };

    return (
        <>
            <nav>
                <span
                    onClick={() => window.location.reload(true)}
                    style={{ cursor: "pointer" }}
                >
                    bubble task
                    {/* {currentUser.username ? currentUser.username : "sandbox"} */}
                </span>
                <ul id="nav-buttons">
                    {currentUser.username ? (
                        <>
                            <li>
                                <button>{currentUser.username}</button>
                            </li>
                            <li>
                                <button onClick={fetchData}>
                                    <i className="fa fa-refresh"></i>
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button data-which="SignUp" onClick={onClick}>
                                    sign up
                                </button>
                            </li>
                            <li>
                                <button data-which="LogIn" onClick={onClick}>
                                    log in
                                </button>
                            </li>
                        </>
                    )}
                    <li>
                        <LogOut
                            apiAddress={apiAddress}
                            setCurrentUser={setCurrentUser}
                        />
                    </li>
                </ul>
            </nav>
            {which === "SignUp" ? (
                <SignUp
                    apiAddress={apiAddress}
                    setCurrentUser={setCurrentUser}
                    setWhich={setWhich}
                />
            ) : null}
            {which === "LogIn" ? (
                <LogIn
                    apiAddress={apiAddress}
                    setCurrentUser={setCurrentUser}
                    setWhich={setWhich}
                />
            ) : null}
        </>
    );
};

export default Nav;
