import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import io from 'socket.io-client';
import { MenuItem, Popover, RaisedButton } from 'material-ui';

import TextEditor from './components/TextEditor';
import Login from './components/Login';
import Register from './components/Register';
import DocPortal from './components/DocPortal';
// import Popover from 'material-ui/core/Popover';

const socket = io('http://localhost:1337');

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      switchToReg: false,
      UserID: '',
      doc: undefined,
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

  PassID(id){
    this.setState({
      UserID: id
    })
  }

  SwitchToDoc(id){
    socket.emit('getSingleDoc', {
      id: id
    },
    (res) => {
      console.log("Response from getSingleDoc is ", res);
      this.setState({
        doc: res.doc
      })
      console.log("this.state.doc is ", this.state.doc);
    })
  }

  render(){
    return (
      <div>
        {this.state.loggedIn ?
          this.state.doc? <TextEditor/> : <DocPortal
            PassID = {this.state.UserID}
            SwitchToDoc = {(id)=>this.SwitchToDoc(id)}
          /> : this.state.switchToReg ? <Register
          SwitchToLog = {(id)=>this.SwitchToLog(id)} /> :
          <Login
            PassID = {(id) => this.PassID(id)}
            SwitchToReg = {() => this.SwitchToReg()} LogMeIn = {()=>this.LogMeIn()}/>}
      </div>
    )
  }
}
