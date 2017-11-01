import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Loader from 'react-loader';
import {LOADER_OPTIONS} from '../../constants/loader';
import RoomList from '../../components/RoomList';

import * as roomListActions from '../../actions/room-list';
import * as activeRoomActions from '../../actions/active-room';

class RoomListContainer extends Component {
  componentDidMount() {
    if (this.props.roomList.items.length === 0) {
      this.props.actions.fetchRooms();
    }
  }

  selectRoom(roomId) {
    this.props.actions.selectRoom(roomId);
  }

  render() {
    const rooms = this.props.roomList.items;

    return (
      <div className="main">
        <div className="content">
           <div className="content__wrap">
              <Loader loaded={!this.props.roomList.pending} options={LOADER_OPTIONS} className="spinner">
              </Loader>
              {this.props.roomList.error ?  <span className="content__extend-error">Something was wrong, please go to setup page and login again</span> : null}
              <RoomList rooms={rooms} selectRoom={this.selectRoom.bind(this)}/>
            </div>
            <Link className="content__btn-cancel btn btn--cancel" to='/setup'>
              <i className="icon-close"/>Cancel
            </Link>
           </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {roomList: state.roomList};
}, (dispatch) => {
  return {actions: bindActionCreators({...roomListActions, ...activeRoomActions}, dispatch)};
})(RoomListContainer);
