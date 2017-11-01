import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import getShortUrl from '../../helpers/short-url';

import QrCode from '../../components/QrCode';
import ShortUrl from '../../components/ShortUrl';
import {API_URL} from '../../constants/booking';

class RoomViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {shortUrl: null, loading: false}
  }

  componentDidMount() {
    if (!this.state.shortUrl && !this.state.loading) {
      this.setState({loading: true});
      const url = API_URL.replace('{{deviceId}}', this.props.device.id);
      getShortUrl(url).then((shortUrl) => this.updateShortUrl(shortUrl));
    }
  }

  updateShortUrl(shortUrl) {
    this.setState({shortUrl, loading: false});
  }

  render() {
    if (!this.props.room.item) {
      return <Redirect to="/room" push={true}/>
    }

    if (this.props.login.logged) {
      return <Redirect to="/room/booking-form" push={true}/>
    }

    const room = this.props.room.item;

    return (
      <div className="content">
        <div className="content__title-wrap">
          <h3 className="content__h3">{room.name}</h3>
        </div>
        <div className="content__wrap">
          {this.state.shortUrl ? (
            <div className="content__code-wrap">
              <div className="content__code">
                <QrCode url={this.state.shortUrl}/>
              </div>
              <ShortUrl url={this.state.shortUrl}/>
              <span className="content__qr-text">Scancode or enter the URL to book.</span>
              <Link to="/room" className="content__qr-btn btn"><i className="icon-close"/>Cancel</Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {room: state.room, device: state.device, login: state.login};
})(RoomViewContainer);
