import React, { useState } from "react";
import SignUp from "./auth/SignUp";
import LogIn from "./auth/LogIn";
import LogOut from "./auth/LogOut";

const Nav = (props) => {
    let currentUser = props.currentUser;
    let setCurrentUser = props.setCurrentUser;

    const [which, setWhich] = useState(null);

    const onClick = (e) => {
        e.preventDefault();
        let which = e.target.dataset.which;
        setWhich(which);
    };

    return (
        <>
            <nav>
                <span>
                    bubble task
                    {/* {currentUser.username ? currentUser.username : "sandbox"} */}
                </span>
                <ul id="nav-buttons">
                    {currentUser.username ? (
                        <li>
                            <button>{currentUser.username}</button>
                        </li>
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
                        <LogOut setCurrentUser={setCurrentUser} />
                    </li>
                </ul>
            </nav>
            {which === "SignUp" ? (
                <SignUp setCurrentUser={setCurrentUser} setWhich={setWhich} />
            ) : null}
            {which === "LogIn" ? (
                <LogIn setCurrentUser={setCurrentUser} setWhich={setWhich} />
            ) : null}
        </>
    );
};

export default Nav;
