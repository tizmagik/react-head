import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadTag from './HeadTag';

export default class Style extends Component {
	render () {
		const { children } = this.props;
		return <HeadTag tag='style'>{children}</HeadTag>;
	}
}
