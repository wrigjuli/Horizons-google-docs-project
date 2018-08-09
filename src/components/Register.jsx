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
      password2: '',
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

  handlePassword2(event) {
    this.setState({
      password2: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('createUser', {
      username: this.state.username,
      password: this.state.password},
      (res) => {
        console.log("Saved?", res)
        this.props.SwitchToLog();
      }
    )
  }

  render(){
    return (
      <div>
        <h1> Register </h1>
        {this.state.error}
        <input type="text"
          onChange = {(event) => this.handleUsername(event)} name=""
          value={this.state.username}
          placeholder = "username"
        />
        <input type="text"
          onChange = {(event) => this.handlePassword(event)} name=""
          value={this.state.password}
          placeholder = "password"
        />

        <input type="text"
          onChange = {(event) => this.handlePassword2(event)} name=""
          value={this.state.password2}
          placeholder = "password2"
        />
        <button onClick = {(event)=>this.handleSubmit(event)}>Submit</button>
        <button onClick= {()=>this.props.SwitchToLog()}>Login Instead!</button>
      </div>
    )
  }
}
