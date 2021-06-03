import React from 'react'
import './Email.css';
import DisplayEmail from './DisplayEmail.js'

const serverURL = 'http://localhost:3001';

class Email extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            emails: [],
            displayEmail: {},
            newEmail: true,
            searchLine: ""
        }

        this.changeEmail = this.changeEmail.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.executeSearch = this.executeSearch.bind(this);
        this.newEmail = this.newEmail.bind(this);
    }  

    async componentDidMount() {
        const url = `${serverURL}/emails`;
        const response = await fetch(url);
    
        if(response.status >= 200 && response.status <= 299) {
            const json = await response.json();
            this.setState({emails: json});
        } else {
             throw new Error(response.status);
        }
    }

    changeEmail(e) {
        this.setState({
            displayEmail: this.state.emails[Number(e.target.id)],
            newEmail: false
        });
    }

    newEmail() {
        this.setState({
            newEmail: true
        })
    }

    setSearch(e) {
        this.setState({searchLine: e.target.value});
    }

    async executeSearch() {
        const url = `${serverURL}/search?query=${this.state.searchLine}`;
        const response = await fetch(url);
    
        if(response.status >= 200 && response.status <= 299) {
            const json = await response.json();
            this.setState({emails: json});
        } else {
             throw new Error(response.status);
        }
    }

    render() {
        const emailList = this.state.emails.map((email, index) => {
            return (
                <div className="emailItem" id={index} onClick={this.changeEmail}>
                    <p>From: {email.sender}</p>
                    <p>Subject: {email.subject}</p>
                </div>
            );
        });

        return (
            <div className="email">
                <div className="emailList">
                    <img src='https://media1.tenor.com/images/23aeaaa34afd591deee6c163c96cb0ee/tenor.gif' />
                    <form>
                        <input type="text" name="search" id="search" onChange={this.setSearch}/>
                        <input type="button" id="setSearch" value="Search" onClick={this.executeSearch} />
                        <input type="button" id="newMail" value="New Mail" onClick={this.newEmail} />
                    </form>
                    {emailList}
                </div>
                <DisplayEmail displayEmail={this.state.displayEmail} isWritable={this.state.newEmail}></DisplayEmail>
            </div>
        )
    }
}

export default Email;