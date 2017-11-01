import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class TimeComponent extends Component {
  updateTime(type, event){
    this.props.setTime(this.props.point, type, event)
  }

  render() {
    return (
      <div className="content__select-box">
        <label className="content__select-label">{this.props.label}</label>
        <div className="content__select-block-wrap">
          <div className="content__select-block">
            <select name="start[hour]" className="content__form-select" value={this.props.defaultValue.hour}
                    onChange={this.updateTime.bind(this, 'hour')}>
              {
                this.props.hours.map(hour => {
                  return <option key={hour}
                                 value={parseInt(hour, 10)}>{moment().hour(hour).format(this.props.timeFormat)}</option>
                })
              }
            </select>
          </div>
          <div className="content__select-block">
            <select name="start[minute]" className="content__form-select" value={this.props.defaultValue.minute}
                    onChange={this.updateTime.bind(this, 'minute')}>
              {
                this.props.minutes.map(minute => {
                  return <option key={minute} value={parseInt(minute, 10)}>{minute}</option>
                })
              }
            </select>
          </div>
        </div>
      </div>
    )
  }
}

TimeComponent.propTypes = {
  hours: PropTypes.array.isRequired,
  minutes: PropTypes.array.isRequired,
  setTime: PropTypes.func.isRequired,
  point: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  defaultValue: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};