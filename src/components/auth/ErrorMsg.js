import React from 'react'

export default function ErrorMsg(props) {
    return (
        <div className="error-messages">
            <span>{props.message}</span>
            <button onClick={props.clearError}>x</button>
        </div>
    )
}
