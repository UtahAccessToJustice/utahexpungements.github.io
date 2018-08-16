import React from 'react'

export default class TextInput extends React.Component {
  state = {
    value: this.props.data[this.props.dataKey]
  }
  render() {
    return (
      <div>
        <label>
          {this.props.label}
          <input
            type="text"
            value={this.state.value || ''}
            onChange={evt => this.setState({value: evt.target.value})}
            onBlur={this.handleBlur}
          />
        </label>
      </div>
    )
  }
  handleBlur = () => {
    this.props.setData(this.props.dataKey, this.state.value)
  }
}