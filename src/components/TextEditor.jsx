import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import io from 'socket.io-client';
import { MenuItem, Popover, RaisedButton } from 'material-ui';


const socket = io('http://localhost:1337');
/* Define custom styles */
const customStyleMap = {
  pink: {
    color: 'pink',
  },
  red: {
    color: 'red',
  },
  black: {
    color: 'black',
  },
};
/* Have draft-js-custom-styles build help functions for toggling font-size, color */
const {
  styles,
  customStyleFn,
} = createStyles(['font-size', 'color'], customStyleMap);

/* Let draft-js know what styles should be block vs inline
 * NOTE: This is needed, but RichUtils.toggleBlockType,
 *       RichUtils.toggleInlineStyle need to get called
 */
function isBlockStyle(style) {
  console.log("style", style, style.indexOf('text-align-'));
  if (style.indexOf('text-align-') === 0) return true;
  return false;
}

function getBlockStyle(block) {
  const type = block.getType();
  return isBlockStyle(type) ? type : null;
  console.log('Hello David');
}

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      fontSizeOpen: false,
      anchorEl: null,
      fontColorOpen: false,
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  componentDidMount() {
    socket.on('createDocument', function(data, next) {
      console.log('data from client ', data);
      next({responseFromServer: 'Hi'})
    })

    socket.emit('createDocument', {myDataFromClient: "hi"}, (res)=> console.log("response from server", res))

    socket.emit('testDoc', {
        title: 'my first document',
        body: 'this is so cool',
        createdby: {
          username: 'Julie',
          password: 'hello1' }
        },
        (res) => console.log("Saved?", res))

      }

  handleMenuClose() {
    console.log('close');
    this.setState({
      anchorEl: null,
      fontSizeOpen: false,
      fontColorOpen: false,
    });
  }

  // Format Text
    _onBoldClick(e) {
      e.preventDefault();
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    _onUClick(e) {
      e.preventDefault();
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    _onIClick(e) {
      e.preventDefault();
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }

    // Placement of Content on Page
    _onCenterClick(e) {
      console.log('center');
      e.preventDefault();
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'text-align-center'));
    }
    _onLeftClick(e) {
      console.log('left');
      e.preventDefault();
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'text-align-left'));
    }
    _onRightClick(e) {
      console.log('right');
      e.preventDefault();
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'text-align-right'));
    }
    _onJustifyClick(e) {
      console.log('just');
      e.preventDefault();
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'text-align-justify'));
    }

    // Text Size Changes
    _onSizeClick(e) {
      e.preventDefault();
      // this.onChange(styles.fontSize.toggle(this.state.editorState, '45px'));
      this.setState({
        fontSizeOpen: true,
        anchorEl: e.currentTarget,
      });
    }

    handleSizeChange(e, size) {
      e.preventDefault();
      this.onChange(styles.fontSize.toggle(this.state.editorState, size));
    }

   //Color Changes
    _onColorClick(e) {
      e.preventDefault();
      this.setState({
        fontColorOpen: true,
        anchorEl: e.currentTarget,
      });
    }

    handleColorChange(e, color) {
      e.preventDefault();
      this.onChange(styles.color.toggle(this.state.editorState, color));
    }


      render() {
        console.log('menu open', this.state.fontSizeOpen);

        return (
          <div>
            <div className="App">
              <header className="App-header">
                <img src="https://image.flaticon.com/icons/svg/118/118306.svg" className="App-logo" />
                <h1>Horizons Docs</h1>
              </header>
            </div>

            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onBoldClick(e)}><img style={{width:'15px'}} src="https://image.flaticon.com/icons/svg/133/133731.svg" /></RaisedButton>
            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onUClick(e)}><img style={{width:'15px'}} src="https://image.flaticon.com/icons/svg/133/133729.svg" /></RaisedButton>
            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onIClick(e)}><img style={{width:'15px'}} src="https://image.flaticon.com/icons/svg/133/133730.svg" /></RaisedButton>
            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onSizeClick(e)  }>Text Size</RaisedButton>
            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onCenterClick(e)}><img style={{width:'15px'}} src="https://image.flaticon.com/icons/svg/133/133718.svg" /></RaisedButton>
            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onLeftClick(e)}><img style={{width:'15px'}} src="https://image.flaticon.com/icons/svg/133/133720.svg" /></RaisedButton>
            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onRightClick(e)}><img style={{width:'15px'}} src="https://image.flaticon.com/icons/svg/133/133719.svg" /></RaisedButton>
            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onJustifyClick(e)}><img style={{width:'15px'}} src="https://image.flaticon.com/icons/svg/133/133717.svg" /></RaisedButton>
            <RaisedButton style={{ width: '20px' }} className="text-align-right" onMouseDown={(e) => this._onColorClick(e)}>Text Color</RaisedButton>


          <Popover
            open={this.state.fontSizeOpen}
            onRequestClose={this.handleMenuClose.bind(this)}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            >
            <MenuItem onClick={(e) => this.handleSizeChange(e, '12px')}>Small</MenuItem>
            <MenuItem onClick={(e) => this.handleSizeChange(e, '36px')}>Medium</MenuItem>
            <MenuItem onClick={(e) => this.handleSizeChange(e, '54px')}>Large</MenuItem>
          </Popover>

          <Popover
            open={this.state.fontColorOpen}
            onRequestClose={this.handleMenuClose.bind(this)}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            >
            <MenuItem onClick={(e) => this.handleColorChange(e, 'yellow')}>Yellow</MenuItem>
            <MenuItem onClick={(e) => this.handleColorChange(e, 'pink')}>Pink</MenuItem>
            <MenuItem onClick={(e) => this.handleColorChange(e, 'red')}>Red</MenuItem>
            <MenuItem onClick={(e) => this.handleColorChange(e, 'blue')}>Blue</MenuItem>
            <MenuItem onClick={(e) => this.handleColorChange(e, 'green')}>Green</MenuItem>
            <MenuItem onClick={(e) => this.handleColorChange(e, 'black')}>Black</MenuItem>
            <MenuItem onClick={(e) => this.handleColorChange(e, 'white')}>White</MenuItem>
          </Popover>

        <Editor
          editorState={this.state.editorState}
          customStyleMap={customStyleMap}
          customStyleFn={customStyleFn}
          blockStyleFn={getBlockStyle}
          onChange={this.onChange}
        />
    </div>
  )};
}
