import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import io from 'socket.io-client';
import { MenuItem, Popover, RaisedButton } from 'material-ui';

const socket = io('http://localhost:1337');

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('login', {
      username: this.state.username,
      password: this.state.password
    }, (result) => {
      if (result.loggedIn) {
        this.props.LogMeIn();
        console.log("Success! Logged in");
      } else {
        console.log("Not logged in", result);
        this.setState({
          error: 'username or password you entered was invalid'
        })
      }
    });
  }

  render(){
    return (
      <div className="App">
        <h1> Login </h1>
        {this.state.error}
        <input type="text"
          onChange = {(event) => this.handleUsername(event)} name=""
          value={this.state.username}
          placeholder = "Username"
        /><br />
        <input type="text"
          onChange = {(event) => this.handlePassword(event)} name=""
          value={this.state.password}
          placeholder = "Password"
        /><br />
        <button onClick = {(event) => this.handleSubmit(event)}>Submit</button><br />
        <button onClick = {()=>this.props.SwitchToReg()}>
          Register!
        </button>
      </div>
    )
  }
}
