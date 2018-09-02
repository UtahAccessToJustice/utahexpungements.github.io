import React from 'react'
import {Scoped} from 'kremling'
import {govtWebFormVerticalRhythm} from 'src/styleguide.js'

export default class TextInput extends React.Component {
  state = {
    value: this.props.data[this.props.dataKey]
  }
  render() {
    return (
      <Scoped css={css}>
        <div className="web-form-input text-input">
          <label>
            {this.props.label}
          </label>
          <input
            type="text"
            value={this.state.value || ''}
            onChange={evt => this.setState({value: evt.target.value})}
            onBlur={this.handleBlur}
          />
        </div>
      </Scoped>
    )
  }
  handleBlur = () => {
    this.props.setData(this.props.dataKey, this.state.value)
  }
}

const css = `
  & .text-input {
    display: flex;
    flex-direction: column;
  }

  & .text-input label {
  }

  & .text-input input {
    width: 200rem;
  }
`