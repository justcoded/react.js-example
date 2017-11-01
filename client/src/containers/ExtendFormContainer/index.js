import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as roomActions from '../../actions/room';

import {Redirect} from 'react-router-dom';
import ExtendForm from '../../components/ExtendForm';

import {
  EXTEND_TIME_VARIANTS
} from '../../constants/extend-form';

class ExtendFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: false
    }
  }

  updateEvent(event) {
    this.props.actions.updateEvent(this.props.room.item.id, this.props.room.item.currentEvent.id, event, () => {
      this.props.history.push('/room');
    });
  }

  onExtend(time) {
    if (this.validateExtendTime(time)) {
      this.updateEvent({
        end: this.props.room.item.currentEvent.end + time
      });
    }
  }

  validateExtendTime(time) {
    if (this.props.room.item.futureEvents.length) {
      const featureEventStartTime = this.props.room.item.futureEvents.sort((a, b) => {
        return a.start - b.start
      })[0].start;

      if (this.props.room.item.currentEvent.end + time > featureEventStartTime) {
        this.setState({
          error: true
        });
        return false
      }
    }

    this.setState({
      error: false
    });
    return true
  }

  render() {
    if (!this.props.room.item) {
      return <Redirect to="/room" push={true}/>
    }

    const room = this.props.room.item;

    return (
      <div className="content">
        <div className="content__title-wrap">
          <h3 className="content__h3">{room.name}</h3>
        </div>
        <ExtendForm variants={EXTEND_TIME_VARIANTS} onExtend={this.onExtend.bind(this)} isError={this.state.error}/>
      </div>
    )
  }
}

export default connect((state) => {
  return {room: state.room};
}, (dispatch) => {
  return {actions: bindActionCreators(roomActions, dispatch)};
})(ExtendFormContainer);
