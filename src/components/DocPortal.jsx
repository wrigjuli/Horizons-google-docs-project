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
      docs: []
    }
  }

  componentDidMount(){
    //get list of docs from the server, use socket.on or socket.emit, put it in this.state.docs
  }

  render() {
    //render a create new doc input, list of my documents
    //input to share a doc ID from another doc
    return(
      <div>
        
      </div>

    )
  }
}
