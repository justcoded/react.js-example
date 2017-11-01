import React, {Component} from 'react';
import TimerContainer from '../../containers/TimerContainer';
import moment from 'moment';

const DATE_FORMAT = 'MMMM DD';

export default class HeaderComponent extends Component {
  constructor() {
    super();
    const timeNow = moment();
    this.state = {
      hours: timeNow.format('hh'),
      minutes: timeNow.format('mm'),
      stamp: timeNow.format('A'),
    };
  }

  componentDidMount() {
    setInterval(() => {
      const timeNow = moment();
      this.setState({
        hours: timeNow.format('hh'),
        minutes: timeNow.format('mm'),
        stamp: timeNow.format('A'),
      })
    }, 1000)
  }

  render() {
    const date = moment().format(DATE_FORMAT);
    return (
      <section className="panel">
        <div className="panel__container">
          <div className="panel__month-wrap">
            <i className="panel__icon icon-calendar"/>
            <span className="panel__month">{date}</span>
          </div>
          <TimerContainer/>
          <time className="panel__time">{this.state.hours}<span className="panel__delimiter">:</span>{this.state.minutes} {this.state.stamp}</time>
        </div>
      </section>
    )
  }
};