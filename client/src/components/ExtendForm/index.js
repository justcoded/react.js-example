import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ExtendFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {extendTime: 0};
  }

  extend(time) {
    this.setState({extendTime: time});
  }

  render() {
    const {variants, onExtend} = this.props;
    const self = this;

    return (
      <div className="content__wrap content__wrap--flex">
        <div className="content__extend">
          <h5 className="content__extend-h5">Extend</h5>
          <div className="content__extend-buttons">
            <div className="content__extend-block">
            {variants.map((item) => {
              return <button
                className={"content__extend-btn btn" + (self.state.extendTime === item.time ? ' btn--active' : '')}
                key={item.time}
                onClick={() => self.extend(item.time)}>
                <span className="content__btn-box">{item.label}</span>
              </button>
            })}
            </div>
          </div>
        </div>
        <div className="content__extend-box">
          {this.props.isError ? <span className="content__extend-error">You can't extend event for this time</span> : null}
          <Link className="content__extend-canel btn" to='/room'>
            <i className="icon-close"></i>Cancel
          </Link>
          <button className="content__extend-done btn"
                  disabled={!this.state.extendTime}
                  onClick={onExtend.bind(this, this.state.extendTime)}>
            <span className="content__btn-box"><i className="icon-check"></i>Done</span>
          </button>
        </div>
      </div>
    );
  }
}

ExtendFormComponent.propTypes = {
  variants: PropTypes.array.isRequired,
  onExtend: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
};