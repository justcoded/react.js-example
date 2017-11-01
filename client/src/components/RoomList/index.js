import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class RoomListComponent extends Component {
  render() {
    const {rooms, selectRoom} = this.props;

    return (
        <div className='content__calendar-wrap'>
          <span className='content__calendar-title'>{rooms.length ? 'Choose calendar to continue' : 'You do not have any calendars'}</span>
          <ul className='content__calendars'>
            {rooms.map((room) => {
              return <li key={room.id} onClick={() => selectRoom(room.id)} className="content__calendar-item"><Link className="content__calendar-link" to='/room'>{room.name}</Link></li>;
            })}
          </ul>
        </div>
    );
  }
}

RoomListComponent.propTypes = {
  rooms: PropTypes.array.isRequired,
  selectRoom: PropTypes.func.isRequired
};