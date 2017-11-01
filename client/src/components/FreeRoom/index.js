import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const TIME_FORMAT = 'h:mm A';

export default class FreeRoomComponent extends Component {
  render() {
    const endOfDay = moment().endOf('day');
    let nextEvent;
    if (this.props.room.futureEvents.length) {
      const featureEventStartTime = this.props.room.futureEvents.sort((a, b) => {
        return a.start - b.start
      })[0].start;
      nextEvent = moment(featureEventStartTime);
      nextEvent = nextEvent.isBefore(endOfDay) ? nextEvent.format(TIME_FORMAT) : null;
    }

    return (
      <div className="content__wrap">
        <div className="content__available">
          <h5 className="content__h5">Available</h5>
          {
            nextEvent ? (
              <div className="content__time-box">
                <span className="content__time-text">Until </span>
                <time className="content__time-available">{nextEvent}</time>
              </div>
            ) : null
          }
          {this.props.error ? <span className="page__msg">Some error occurs</span> : null}
          <Link className="content__available-btn btn" to="/room/booking">
            <span className="content__btn-box">
              <i className="content__available-icon icon-book"/>Book</span>
          </Link>
        </div>
      </div>
    );
  }
}

FreeRoomComponent.propTypes = {
  room: PropTypes.object.isRequired
};