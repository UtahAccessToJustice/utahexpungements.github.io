import React from 'react'
import {Scoped} from 'kremling'
import {lightGray} from 'src/styleguide.js'
import {Link} from 'react-router-dom'

export default class FillableForm extends React.Component {
  render() {
    return (
      <Scoped css={css}>
        <Link to={this.props.appLink} className="link">
          <div className="fillable-form">
            <img className="preview-thumbnail" src={this.props.previewUrls[0]} />
            <div className="name">
              {this.props.name}
            </div>
          </div>
        </Link>
      </Scoped>
    )
  }
}

const css = `
  & .link {
    text-decoration: none;
  }

  & .fillable-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 182rem;
    min-height: 285rem;
    cursor: pointer;
    background-color: ${lightGray};
    padding: 6rem;
    border-radius: 3rem;
    margin-right: 32rem;
  }

  & .fillable-form:hover {
    opacity: .8;
  }

  & .preview-thumbnail {
    /* 8.5 x 11 aspect ratio */
    width: 170rem;
    min-width: 170rem;
    height: 200rem;
    min-height: 200rem;
  }

  & .name {
    text-align: center;
    padding: 8rem;
  }
`
