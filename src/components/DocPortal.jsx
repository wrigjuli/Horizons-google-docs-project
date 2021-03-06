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

  getAllDocs(){
    //get list of docs from the server, use socket.on or socket.emit, put it in this.state.docs
  socket.emit('getDocs', {
      request: true
    },
  (res) => {
    this.setState({
      docs: res.docs
    })
    console.log("this.state.docs is ", this.state.docs);
  })
  }

  componentDidMount(){
    this.getAllDocs();
  }

  handleCreate(event) {
    this.setState({
      create: event.target.value
    })
  }

  handleCreateDoc(event){
    event.preventDefault();
    console.log("You clicked on create a doc!");
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
            this.getAllDocs();
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
        <ul>
        {this.state.docs.map((doc)=>{
          return(
            <li key={doc._id}><button onClick = {()=>this.props.SwitchToDoc(doc._id)}>{doc.title}</button></li>
          )
        })}
      </ul>
      </div>

    )
  }
}
