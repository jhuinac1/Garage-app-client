import React from 'react'

export default function ErrorMsg(props) {
    return (
        <div className="error-messages">
            <button onClick={props.clearError} className="fas fa-times-circle"></button>
            <span>{props.message}</span>
        </div>
    )
}
