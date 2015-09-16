import React from 'react';
import {Link} from 'react-router';

export default class SideBar extends React.Component {
	constructor(args) {
		super(args);
	}
	render() {
		return (
			<nav id="nav">
				<ul>
					<li><Link to="home">Home</Link></li>
					<li><Link to="projectList">Projects</Link></li>
					<li><Link to="projectList">About</Link></li>
				</ul>
			</nav>
		)
	}
}