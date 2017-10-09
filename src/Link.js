import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadTag from './HeadTag';

export default class Link extends Component {
	static propTypes = {
		rel: PropTypes.string,
		content: PropTypes.string
	};

	render () {
		return <HeadTag tag='link' {...this.props} />;
	}
}
