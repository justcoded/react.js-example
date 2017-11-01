import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const TIME_FORMAT = 'h:mm A';
const MAX_COUNT_SYMBOL = 27;

export default class BusyRoomComponent extends Component {
  render() {
    const {room} = this.props;
    const currentEvent = room.currentEvent;
    let eventName;
    if (currentEvent.name) {
      eventName = currentEvent.name.length > MAX_COUNT_SYMBOL ? currentEvent.name.slice(0, MAX_COUNT_SYMBOL) + '...' : currentEvent.name;
    }
    const currentEventStart = moment(new Date(currentEvent.start));
    const currentEventEnd = moment(new Date(currentEvent.end));

    return (
      <div className="content__wrap content__wrap--flex">
        <div className="content__holder">
          <div className="content__event">
            <h4 className="content__h4">{eventName}</h4>
            <time className="content__time content__time--available">
              {currentEventStart.format(TIME_FORMAT)} - {currentEventEnd.format(TIME_FORMAT)}
            </time>
            <div className="content__remaining-wrap">
              <i className="content__remaining-icon icon-remain"/>
              <span className="content__remaining-text">
                    (Remaining {currentEventEnd.diff(Date.now(), 'm')} minutes)
                  </span>
            </div>
            </div>
        </div>
        {this.props.error ? <span className="page__msg">Some error occurs</span> : null}
          <div className="content__buttons">
            <Link className="content__buttons-btn btn" to="/room/extend">
              <span className="content__btn-box"><i className="content__buttons-icon icon-plus"/>Extend</span>
            </Link>
            <button className="content__buttons-btn btn btn--secondary" onClick={this.props.onEndEvent}>
              <span className="content__btn-box"><i className="content__buttons-icon icon-check"/>End</span>
            </button>
        </div>
      </div>
    );
  }
}

BusyRoomComponent.propTypes = {
  onEndEvent: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired
};