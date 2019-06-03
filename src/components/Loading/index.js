import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';

let additionalcss;

const override = {
  margin: '0px auto',
};

class Loading extends Component {
  constructor(props) {
    super(props);
    const { additionalclass } = this.props;
    if (additionalclass) {
      additionalcss = additionalclass;
    } else {
      additionalcss = 'loading';
    }
  }

  render() {
    return (
      <div className={additionalcss}>
        <PulseLoader css={override} color="#000" />
      </div>
    );
  }
}

Loading.propTypes = {
  additionalclass: PropTypes.string,
};

export default Loading;
