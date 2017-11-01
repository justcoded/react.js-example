import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import SetupContainer from '../SetupContainer';

import RoomListContainer from '../RoomListContainer';
import RoomWrapperContainer from '../RoomWrapperContainer';

import * as device from '../../helpers/device';
import * as activeRoomActions from '../../actions/active-room';
import * as deviceActions from '../../actions/device';
import * as timerActions from '../../actions/timer';

import {addOnAuthFailListener} from '../../helpers/request';

class MainContainer extends Component {
  componentWillMount() {
    this.props.actions.initDevice((state, payload) => {
      if (payload && payload.expireAt) {
        this.props.actions.startCountDown(payload.expireAt);
      }

      switch (state) {
        case 'booking':
          return this.props.history.push('/room/booking-form');
        default:
          return this.props.history.push('/room');
      }
    });
    addOnAuthFailListener((data) => {
      if (data.scope === 'admin') {
        this.props.history.push('/setup')
      } else if (data.scope === 'user') {
        this.props.history.push('/room')
      }
    })
  }

  render() {
    const isDeviceReady = device.isReady();
    const hasActiveRoom = this.props.activeRoom.id;

    return (
      <Switch>
        <Redirect exact from="/" to="/room"/>
        <Route path="/room" render={props => (
          isDeviceReady && hasActiveRoom ?
            <RoomWrapperContainer/> :
            <Redirect to='/setup'/>
        )}/>
        <Route path="/setup" component={SetupContainer}/>
        <Route path="/room-list" render={() => (
          isDeviceReady ?
            <RoomListContainer/> :
            <Redirect to='/setup'/>
        )}/>
      </Switch>
    );
  }
}

export default withRouter(connect((state) => {
  return {activeRoom: state.activeRoom};
}, (dispatch) => {
  return {actions: bindActionCreators({...activeRoomActions, ...deviceActions, ...timerActions}, dispatch)};
})(MainContainer));