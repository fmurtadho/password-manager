import React from "react";

const Button = props => {

    return (
        <button
            className={props.bootstrap}
            onClick={props.action}
            type={props.type}
            disabled={props.disabled}
        >
        {props.title}
        </button>
    );
};

export default Button;