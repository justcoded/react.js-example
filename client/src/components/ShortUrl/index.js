import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ShortUrlComponent extends Component {

  render() {
    return (
      <a className="content__qr-link">{this.props.url}</a>
    );
  }
}

ShortUrlComponent.propTypes = {
  url: PropTypes.string.isRequired
};