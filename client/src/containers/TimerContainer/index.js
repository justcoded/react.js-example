import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

class TimerContainer extends Component {
  constructor() {
    super();

    this.state = {
      duration: null
    };

    this.timerInterval = 0;
  }

  componentWillReceiveProps(newState) {
    clearInterval(this.timerInterval);

    if (newState.timeEnd) {
      let diffTime = newState.timeEnd - Date.now();

      this.setState({
        duration: moment.duration(diffTime, 'milliseconds')
      });

      const timer = setInterval(() => {
        diffTime = newState.timeEnd - Date.now();

        if (diffTime <= 0) {
          clearInterval(timer);

          this.setState({
            duration: null
          });

          return;
        }

        this.setState({
          duration: moment.duration(diffTime, 'milliseconds')
        });
      }, 1000);
    }
  }

  render() {
    if (this.state.duration) {
      const duration = this.state.duration.asMilliseconds();

      return (
        <div className="panel__timer">
          <i className="icon-user"/>
          {moment(duration).format('mm')}<span className="panel__delimiter">:</span>{moment(duration).format('ss')}
        </div>
      )
    }

    return null
  }
}

export default connect((state) => {
  return {timeEnd: state.timer.endTime};
})(TimerContainer);