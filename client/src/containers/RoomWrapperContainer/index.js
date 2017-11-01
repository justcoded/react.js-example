import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Loader from 'react-loader';
import {LOADER_OPTIONS} from '../../constants/loader';

import BookingContainer from '../BookingContainer';
import ExtendFormContainer from '../ExtendFormContainer';
import BookingFormContainer from '../BookingFormContainer';
import RoomContainer from '../RoomContainer';
import RoomSideBarComponent from '../../components/RoomSideBar';
import {bindActionCreators} from 'redux';

import * as roomActions from '../../actions/room';

class RoomWrapperContainer extends Component {
  componentDidMount() {
    if (!this.props.room.item && this.props.activeRoom.id) {
      this.props.actions.fetchRoom(this.props.activeRoom.id);
      this.props.actions.initLiveUpdate(this.props.activeRoom.id);
    }
  }

  render() {
    const room = this.props.room.item;
    return (
      <div className="main">
          <Loader loaded={!this.props.room.loading} options={LOADER_OPTIONS} className="spinner">
          </Loader>
          <HashRouter>
            <Switch>
              <Route exact path="/room" render={(props) => (
                room ? <RoomContainer/> : null
              )}/>
              <Route path="/room/booking" component={BookingContainer}/>
              <Route path="/room/extend" component={ExtendFormContainer}/>
              <Route path="/room/booking-form" component={BookingFormContainer}/>
            </Switch>
          </HashRouter>
          {room ? <RoomSideBarComponent room={room}/> : null}
      </div>
    )
  }
}

export default connect((state) => {
  return {activeRoom: state.activeRoom, room: state.room, loading: state.loading};
}, (dispatch) => {
  return {actions: bindActionCreators(roomActions, dispatch)};
})(RoomWrapperContainer);