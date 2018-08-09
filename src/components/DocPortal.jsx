import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import io from 'socket.io-client';
import { MenuItem, Popover, RaisedButton } from 'material-ui';

const socket = io('http://localhost:1337');

export default class DocPortal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      docs: [],
      create: ''
    }
  }

  componentDidMount(){
    //get list of docs from the server, use socket.on or socket.emit, put it in this.state.docs
    socket.emit('getDocs', {
      request: true
    },
  (res) => {
    console.log("response from getDocs is", res);
  })
  }

  handleCreate(event) {
    this.setState({
      create: event.target.value
    })
  }

  handleCreateDoc(event){
    event.preventDefault();
    socket.emit('createDoc', {
        title: this.state.create,
        body: '',
        createdby: this.props.PassID,
        },
        (res) => {
          console.log("Saved?", res)
          if (res.saved === true){
            this.setState({
              create: '',
            })
          }

        })
  }

  render() {
    //render a create new doc input, list of my documents
    //input to share a doc ID from another doc
    return(
      <div>
        <input
          onChange = {(event) => this.handleCreate(event)} type="text" name="" value={this.state.create}
          placeholder = "create new Document"/>
        <button onClick= {(e)=>this.handleCreateDoc(e)}>Create Doc!</button>
      </div>

    )
  }
}
