import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import RoomEvent from '../RoomEvent'
import moment from 'moment';
import {PIXEL_COUNT_SCROLL} from '../../constants/sidebar';
import * as domHelper from '../../helpers/dom-helper';

export default class RoomSideBarComponent extends Component {
  constructor() {
    super();
    this.state = {
      showButtons: true,
      disableScrollTopButton: true,
      disableScrollDownButton: true
    }
  }

  componentDidMount() {
    this.eventsList.addEventListener('scroll', this.updateEventListPosition.bind(this));
    this.eventsList.addEventListener('touchend', this.updateEventListPosition.bind(this));
    this.updateEventListPosition(true)
  }

  componentDidUpdate() {
    this.updateEventListPosition();
  }

  updateEventListPosition(isFirstCall) {
    const isScrollExist = domHelper.isScrollExist(this.holder, this.eventsList);
    if (this.state.showButtons !== isScrollExist || isFirstCall) {
      this.setState({
        showButtons: isScrollExist,
        disableScrollTopButton: domHelper.isElementAbove(this.eventsList),
        disableScrollDownButton: domHelper.isElementBelow(this.eventsList)
      });
    }
  }

  scrollElement(elementClassName, pixelCount) {
    domHelper.scrollElement(elementClassName, pixelCount);
    this.setState({
      disableScrollTopButton: domHelper.isElementAbove(this.eventsList),
      disableScrollDownButton: domHelper.isElementBelow(this.eventsList)
    })
  }

  componentWillUnmount() {
    this.eventsList.removeEventListener('scroll', this.updateEventListPosition.bind(this));
    this.eventsList.removeEventListener('touchend', this.updateEventListPosition.bind(this));
  }

  render() {
    const {room} = this.props;
    const endDay = moment().endOf("day");
    const futureEvents = room.futureEvents.filter(item => {
      return moment(item.start).isBefore(endDay)
    }).sort((a, b) => {
      return a.start - b.start
    });
    return (
      <aside className="sidebar">
        <div className="sidebar__panel">
          <span className="sidebar__panel-title">Up Next :</span>
          <Link className="sidebar__btn btn" to="/room/booking">
            <span className="content__btn-box"><i className="sidebar__icon-btn icon-book"/>Book</span>
          </Link>
        </div>
        <div className="sidebar__holder" ref={holder => this.holder = holder}>
          {!futureEvents.length ? <span className="sidebar__info-events">There are no events for today.</span> : ""}
          <ul className="sidebar__list" ref={eventsList => this.eventsList = eventsList}>
            {
              futureEvents.map(event => {
                return <RoomEvent key={event.id} event={event}/>
              })
            }
          </ul>
          <div>
          </div>
        </div>
        <div className={this.state.showButtons ? 'sidebar__nav-btn' : 'sidebar__nav-btn--hidden'}>
            <span className={this.state.disableScrollTopButton ? 'sidebar__next btn' : 'sidebar__nav-btn--disabled sidebar__next btn'}
                  onClick={this.scrollElement.bind(this, 'sidebar__list', -PIXEL_COUNT_SCROLL)}>
              <i className="icon-arrow-up"/>
            </span>
          <span className={this.state.disableScrollDownButton ? 'sidebar__prev btn' : 'sidebar__nav-btn--disabled sidebar__prev btn'}
                onClick={this.scrollElement.bind(this, 'sidebar__list', PIXEL_COUNT_SCROLL)}>
              <i className="icon-arrow-down"/>
            </span>
        </div>
      </aside>
    );
  }
}

RoomSideBarComponent.propTypes = {
  room: PropTypes.object.isRequired
};

