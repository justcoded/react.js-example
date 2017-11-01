import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BusyRoomComponent from '../../components/BusyRoom';
import FreeRoomComponent from '../../components/FreeRoom';

import * as roomActions from '../../actions/room';
import * as loginActions from '../../actions/login';

class RoomContainer extends Component {
  componentDidMount() {
    this.props.actions.checkLoginStatus();
  }

  onEndEvent() {
    const room = this.props.room.item;
    this.props.actions.updateEvent(room.id, room.currentEvent.id, {end: Date.now()});
  }

  render() {
    const room = this.props.room.item;
    const {error} = this.props.room;
    return (
      <div className="content">
        <div className="content__title-wrap">
          <h3 className="content__h3">{room.name}</h3>
        </div>
        {room.currentEvent ? (
          <BusyRoomComponent room={room} onEndEvent={this.onEndEvent.bind(this)} error={error}/>
        ) : (
          <FreeRoomComponent room={room} error={error}/>
        )}
      </div>
    );

  }
}

export default connect((state) => {
  return {room: state.room, activeRoom: state.activeRoom};
}, (dispatch) => {
  return {actions: bindActionCreators({...roomActions, ...loginActions}, dispatch)};
})(RoomContainer);
