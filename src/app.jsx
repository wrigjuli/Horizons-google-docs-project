import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import io from 'socket.io-client';
import { Menu, MenuItem, Popover, RaisedButton } from 'material-ui';
// import Popover from 'material-ui/core/Popover';
const socket = io('http://localhost:1337');


/* Define custom styles */
const customStyleMap = {
  small: {
    fontSize: '12px',
  },
  medium: {
    fontSize: '16px',
  },
  large: {
    fontSize: '20px',
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

/* list of button we need to render */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      fontMenuOpen: false,
      anchorEl: null,
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  componentDidMount() {
    socket.emit('login', { user: 'demi', pass: 'demi' }, (result) => {
      console.log('login result:', result);
    });
  }

  handleMenuClose() {
    console.log('close');
    this.setState({
      anchorEl: null,
      fontMenuOpen: false,
    });
  }

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
  _onSizeClick(e) {
    e.preventDefault();
    // this.onChange(styles.fontSize.toggle(this.state.editorState, '45px'));
    this.setState({
      fontMenuOpen: true,
      anchorEl: e.currentTarget
    })
  }

  handleSizeChange(e, size){
    e.preventDefault();
    this.onChange(styles.fontSize.toggle(this.state.editorState, size));
      }

  // _onBulletClick(e) {
  //   e.preventDefault();
  //   this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'bullet-lists'));
  // }  --> make this in an image of lists


  render() {

    console.log('menu open', this.state.fontMenuOpen);

    return (<div>
      <h1>Horizons Docs</h1>
      <RaisedButton color="primary" onMouseDown={(e) => this._onBoldClick(e)}>BOLD</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onUClick(e)}>U</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onIClick(e)}>I</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onSizeClick(e)}>Size</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onCenterClick(e)}>Center</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onLeftClick(e)}>Left</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onRightClick(e)}>Right</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onJustifyClick(e)}>Justify</RaisedButton>
      {/* <img src="" /> */}


      <Popover
        open={this.state.fontMenuOpen}
        onRequestClose={this.handleMenuClose.bind(this)}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        >
        <MenuItem onClick={(e) => this.handleSizeChange(e, '12px')}>Small</MenuItem>
        <MenuItem onClick={(e) => this.handleSizeChange(e, '36pxpx')}>Medium</MenuItem>
        <MenuItem onClick={(e) => this.handleSizeChange(e, '54px')}>Large</MenuItem>
      </Popover>




      {/* <Menu id="fontMenu"
        open={false}
        onClose={() => this.handleMenuClose()}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
      </Menu> */}

      <Editor
        editorState={this.state.editorState}
        customStyleMap={customStyleMap}
        customStyleFn={customStyleFn}
        blockStyleFn={getBlockStyle}
        onChange={this.onChange}
      />
    </div>);
  }
}
