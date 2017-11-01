import React, {Component} from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

export default class QrCodeComponent extends Component {
  render() {
    const {url} = this.props;

    return (
      <div className="content__code-img">
        <QRCode value={url}/>
      </div>
    );
  }
}

QrCodeComponent.propTypes = {
  url: PropTypes.string.isRequired
};