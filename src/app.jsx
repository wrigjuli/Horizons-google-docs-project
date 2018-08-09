import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import io from 'socket.io-client';
import { MenuItem, Popover, RaisedButton } from 'material-ui';

import TextEditor from './components/TextEditor';
import Login from './components/Login';
import Register from './components/Register';
// import Popover from 'material-ui/core/Popover';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      switchToReg: false
    }
  }

  LogMeIn(){
    this.setState({
      loggedIn: true
    })
  }

  SwitchToReg(){
    this.setState({
      switchToReg: true
    })
  }

  SwitchToLog(){
    this.setState({
      switchToReg: false
    })
  }

  render(){
    return (
      <div>
        {this.state.loggedIn ? <TextEditor/> : this.state.switchToReg ? <Register
          SwitchToLog = {()=>this.SwitchToLog()} /> :
          <Login SwitchToReg = {() => this.SwitchToReg()} LogMeIn = {()=>this.LogMeIn()}/>}
      </div>
    )
  }
}
