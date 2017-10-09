import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadTag from './HeadTag';

export default class Style extends Component {
	static propTypes = {
		rel: PropTypes.string,
		content: PropTypes.string
	};

	render () {
		const { children } = this.props;
		return <HeadTag tag='style'></HeadTag>;
	}
}
