import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TIME_FORMAT = 'h:mm a';
const MAX_COUNT_SYMBOL = 40;

export default class RoomEventComponent extends Component {
  render() {
    const {event} = this.props;
    const start = moment(event.start).format(TIME_FORMAT);
    const end = moment(event.end).format(TIME_FORMAT);

    return (
      <li className="sidebar__item">
        <time className="sidebar__time">{start} - {end}</time>
        {event.name ? <span className="sidebar__title">{event.name.length > MAX_COUNT_SYMBOL ? event.name.slice(0, MAX_COUNT_SYMBOL) + '...' : event.name}</span> : null}
      </li>
    );
  }
}

RoomEventComponent.propTypes = {
  event: PropTypes.object.isRequired
};