import React from 'react'
import './DisplayEmail.css'

const serverURL = 'http://localhost:3001';

let state = {
    to: "",
    from: "",
    subject: "",
    message: ""
}

const DisplayEmail = (props) => {

    if (props.isWritable) {

        const updateState = (e) => {
            state[e.target.name] = e.target.value;
        }

        const sendEmail = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'sender': state.from,
                    'recipient': state.to,
                    'subject': state.subject,
                    'message': state.message
                })
            }

            fetch(`${serverURL}/send`, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
        }    

        return(
            <div className="emailDisplay">
                <form>
                    <label for="subject">Subject: </label>
                    <input type="text" name="subject" onChange={updateState} />
                    <br />
                    <label for="from">From: </label>
                    <input type="email" name="from" onChange={updateState} />
                    <br />
                    <label for="to">To: </label>
                    <input type="email" name="to" onChange={updateState} />
                    <br />
                    <input type="button" name="send" className="sendButton" value="Send Email" onClick={sendEmail} />
                    <textarea name="message" rows={20} onChange={updateState} />
                </form>
            </div>
        )
    } else {
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
}

export default DisplayEmail;