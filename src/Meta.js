import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadTag from './HeadTag';

export default class Meta extends Component {
	static propTypes = {
		name: PropTypes.string,
		content: PropTypes.string
	};

	render () {
		return <HeadTag tag='meta' {...this.props} />;
	}
}
