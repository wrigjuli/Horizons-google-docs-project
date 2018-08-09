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
      password: ''
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

  }

  render(){
    return (
      <div>
        <h1> Login </h1>
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
        <button>Submit</button>
      </div>
    )
  }
}
