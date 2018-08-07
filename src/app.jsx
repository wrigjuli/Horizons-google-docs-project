import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Editor, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles'

/* Define custom styles */
const customStyleMap = {
  selection0: {
    borderLeft: 'solid 3px red',
    backgroundColor: 'rgba(255,0,0,.5)'
  },
  selection1: {
    borderLeft: 'solid 3px blue',
    backgroundColor: 'rgba(0,255,0,.5)'
  },
  selection2: {
    borderLeft: 'solid 20px green',
    backgroundColor: 'rgba(40,50,255,.5)',
    fontSize: '80px'
  }
}

/* Have draft-js-custom-styles build help functions for toggling font-size, color */
const {
  styles,
  customStyleFn,
} = createStyles(['font-size', 'color'], customStyleMap)

/* Let draft-js know what styles should be block vs inline
 * NOTE: This is needed, but RichUtils.toggleBlockType,
 *       RichUtils.toggleInlineStyle need to get called
 */
function isBlockStyle(style) {
  if(style.indexOf('text-align-') === 0) return true
  return false
}

function getBlockStyle(block) {
  const type = block.getType()
  return isBlockStyle(type) ? type : null
}

/* list of button we need to render */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  _onBoldClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onUClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  _onIClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onIFoobarlick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'selection2'));
  }
  _onICetnerlick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'text-align-center'));
  }
  _onSizeClick(e) {
    e.preventDefault()

    this.onChange(styles['fontSize'].toggle(this.state.editorState, '45px'))
  }

  render() {
    return (<div>
      <RaisedButton onMouseDown={(e) => this._onBoldClick(e)}>BOLD</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onUClick(e)}>U</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onIClick(e)}>I</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onSizeClick(e)}>Size</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onIFoobarlick(e)}>Foobar</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onICetnerlick(e)}>Center</RaisedButton>
      <RaisedButton onMouseDown={(e) => this._onICetner2lick(e)}>Center 2</RaisedButton>
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
