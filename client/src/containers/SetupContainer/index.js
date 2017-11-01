import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as setupActions from '../../actions/setup-account';

import {refreshDeviceId, getDeviceId, syncDeviceIdWithSockets} from '../../helpers/device';
import {UPDATE_DEVICE_ID_TRANSPORT_EVENT} from '../../constants/device';

const EMPTY_FIELD_ERROR = 'Please set access code';

class SetupContainer extends Component {
  constructor() {
    super();
    this.state = {
      emptyFieldError: null
    }
  }

  componentDidMount() {
    const deviceId = refreshDeviceId();
    this.props.actions.fetchAuthUrl(deviceId);
    syncDeviceIdWithSockets(UPDATE_DEVICE_ID_TRANSPORT_EVENT, {deviceId});
  }

  submit() {
    const token = this.refs.token.value;
    this.setState({
      emptyFieldError: null
    });
    if (!token) {
      this.setState({
        emptyFieldError: EMPTY_FIELD_ERROR
      });
      return
    }

    const deviceId = getDeviceId();
    this.props.actions.setupAccount(token, deviceId, (res) => {
      this.props.history.push('/room-list')
    });
  }

  render() {
    const error = this.props.setup.error ? this.props.setup.error.response.data.error : this.state.emptyFieldError;
    const setupUrl = this.props.setup.url;

    return (
      <div className="page__form-login">
        {
          setupUrl ?
            <span className="page__form-link">1. Click <a className="page__form-link2" href={setupUrl} target="blank">here</a> to get your access code</span> :
            <span className="page__form-link">Loading ...</span>
        }
        <h3 className="page__form-h3">2. Please paste your access code in the field below</h3>
        {
          error ? <div className="page__form-error">
            <span className="page__error-form-msg">{error}</span>
          </div> : null
        }
        <div className="page__form-block">
          <input className="page__form-input" type="text" ref='token' placeholder="Access Code"/>
          <button className="page__form-btn btn" onClick={this.submit.bind(this)}><span className="content__btn-box">Submit</span>
          </button>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {setup: state.setup};
}, (dispatch) => {
  return {actions: bindActionCreators(setupActions, dispatch)};
})(SetupContainer);
