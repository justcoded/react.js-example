import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import TimeComponent from '../Time';

import {HOURS, MINUTES, TIME_FORMAT, ERROR_WRONG_TIME, ERROR_MESSAGE_NAME} from '../../constants/booking';

export default class BookingFormComponent extends Component {
  constructor(params) {
    super(params);

    this.state = {
      name: '',
      start: {
        hour: 0,
        minute: 0
      },
      end: {
        hour: 0,
        minute: 0
      },
      isValid: true,
      hours: HOURS
    };
  }

  isEventInRange(event, start, end) {
    return start < event.end && end > event.start
  }

  validateEvent(start, end) {

    let isValidName = !!this.state.name;
    let errorMessage = isValidName ? '' : ERROR_MESSAGE_NAME;
    if (!isValidName) {
      this.setState({
        isValid: isValidName,
        errorMessage
      });
      return isValidName
    }
    let isValidInterval = true;
    const timeNow = Date.now();

    const events = this.props.room.currentEvent ? [...this.props.room.futureEvents, this.props.room.currentEvent] : this.props.room.futureEvents;

    const intersectedEvent = events.find((event) => this.isEventInRange(event, start, end));

    if (start <= timeNow || intersectedEvent || start >= end) {
      isValidInterval = false;
      errorMessage = ERROR_WRONG_TIME;
    }

    this.setState({
      isValid: isValidInterval,
      errorMessage
    });

    return isValidInterval;
  }

  get startTime() {
    return moment().startOf('day').hours(this.state.start.hour).minutes(this.state.start.minute).unix() * 1000;
  }

  get endTime() {
    return moment().startOf('day').hours(this.state.end.hour).minutes(this.state.end.minute).unix() * 1000;
  }

  book() {
    if (this.validateEvent(this.startTime, this.endTime)) {
      this.props.onBook({
        name: this.state.name,
        start: moment().startOf('day').add(this.state.start.hour, 'hours').add(this.state.start.minute, 'minutes').unix() * 1000,
        end: moment().startOf('day').add(this.state.end.hour, 'hours').add(this.state.end.minute, 'minutes').unix() * 1000
      });
    }
  }

  setName(event) {
    this.setState({name: event.target.value});
  }

  setTime(point, type, event) {
    this.setState({
      [point]: {...this.state[point], [type]: event.target.value}
    });
  }

  render() {
    return (
      <div className="content__wrap content__wrap--flex">
      <div className="content__form-wrap">
        <h4 className="content__form-title">Booking</h4>
        <div className="content__form">
          <div className="content__form-row">
            <div className="content__select-box">
              <label className="content__input-label">Event name</label>
              <input type="text" className="content__form-input"
                     value={this.state.name}
                     onChange={this.setName.bind(this)}/>
            </div>
            <div className="content__select-wrap">
              <TimeComponent hours={this.state.hours}
                                minutes={MINUTES}
                                setTime={this.setTime.bind(this)}
                                point='start'
                                defaultValue={this.state.start}
                                timeFormat={TIME_FORMAT}/>
              <TimeComponent hours={this.state.hours}
                                minutes={MINUTES}
                                setTime={this.setTime.bind(this)}
                                point='end'
                                defaultValue={this.state.end}
                                timeFormat={TIME_FORMAT}/>
            </div>
          </div>
          {
            !this.state.isValid ? (
              <div className="content__form-error">
                <span className="content__error-form-msg">{this.state.errorMessage}</span>
              </div>
            ) : null
          }
          {
            this.props.error ? (
              <div className="content__form-error">
                <span className="content__error-form-msg">{this.props.error}</span>
              </div>
            ) : null
          }
        </div>
      </div>
        <div className="content__btn-form-wrap">
          <Link className="btn--cancel btn" to='/room'>
            <i className="icon-close"/>Cancel
          </Link>
          <button type="button" className="content__form-btn btn"
                  onClick={this.book.bind(this)}>
            <span className="content__btn-box">
              <i className="content__form-icon icon-book"/>Book
            </span>
          </button>
        </div>
      </div>
    );
  }
}

BookingFormComponent.propTypes = {
  onBook: PropTypes.func.isRequired,
  room: PropTypes.object.isRequired,
  error: PropTypes.string
};