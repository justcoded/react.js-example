import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import BookingForm from '../../components/BookingForm';

import * as roomActions from '../../actions/room';

class BookingFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: false
    }
  }

  componentWillMount() {
    this.props.actions.clearErrorMessages();
  }

  onBook(event) {
    this.props.actions.createEvent(this.props.room.item.id, this.props.device.id, event, () => {
      this.props.history.push('/room');
    });
  }

  render() {
    if (!this.props.room.item) {
      return <Redirect to="/room" push={true}/>
    }
    const room = this.props.room.item;
    const error = this.props.room.createEventError ? this.props.room.createEventError.response.data.error : null;

    return (
      <div className="content">
        <div className="content__title-wrap">
          <h3 className="content__h3">{room.name}</h3>
        </div>
        <BookingForm room={room} onBook={this.onBook.bind(this)} error={error}/>
      </div>
    )
  }
}

export default connect((state) => {
  return {room: state.room, device: state.device};
}, (dispatch) => {
  return {actions: bindActionCreators(roomActions, dispatch)};
})(BookingFormContainer);
