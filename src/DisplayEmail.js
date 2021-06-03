import React from 'react'
import './DisplayEmail.css'

const DisplayEmail = (props) => {

    return(
        <div className="emailDisplay">
            <h2>Subject: {props.displayEmail.subject}</h2>
            <p>To: {props.displayEmail.recipient}</p>
            <p>From: {props.displayEmail.sender}</p>
            <p>Date: {props.displayEmail.date} ID: {props.displayEmail.id}</p>
            <p>Message: </p>
            <p>{props.displayEmail.message}</p>
        </div>
    )
}

export default DisplayEmail;