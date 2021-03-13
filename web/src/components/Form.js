import React, { useState } from "react";

const Form = (props) => {
    let which = props.which;

    const [name, setName] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(name);
        setName("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={`new-${which}`}>
                <input
                    id={`new-${which}`}
                    type="name"
                    value={name}
                    onChange={handleChange}
                    placeholder={`Add a ${which}...`}
                />
            </label>
        </form>
    );
};

export default Form;
