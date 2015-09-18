import React from 'react';
import {Link} from 'react-router';
import NavAction from '../actions/NavAction';
import NavStore from '../stores/NavStore';
import $ from '../jquery';

function openNav() {
	$('#app').addClass('show-nav');
	$('#nav-toggle').addClass('uac-close')
	$('#nav-toggle').addClass('uac-dark');
}

function closeNav() {
	$('#app').removeClass('show-nav');
	$('#nav-toggle').removeClass('uac-close')
	$('#nav-toggle').removeClass('uac-dark');
}

export default class Nav extends React.Component {
	constructor(args) {
		super(args);
	}

	componentDidMount() {
		NavStore.addChangeListener(this._onChange);

		// store dom elements here
		this.ele = {
			app:document.getElementById('app'),
			navSvgPoints : {
				from: 	[115,800,115,800,115,1,115,1 ],
				to: 	[115,800,5 , 800,115,1,115,1 ],
			}
		}

		this.ele.navSvg = Snap( document.getElementById('nav-svg') );//;
		this.ele.navSvgPolygon = this.ele.navSvg.polygon( this.ele.navSvgPoints.from );
		this.ele.navSvgPolygon.attr({
			id:"nav-svg-poly",
			fill: "#ffffff",
		});
		this.ele.isNavSvgOpen = false;

		// -----create a backdrop overlay ------
		this.ele.backdrop = document.createElement('div');
		this.ele.backdrop.id = 'nav-backdrop';
		this.ele.app.appendChild( this.ele.backdrop );
		// add event listener to close nav
		this.ele.backdrop.addEventListener('click',function(e){
			NavAction.toggle('close');
		});


		this._onChange();
	}

	componentWillUnmount() {
		NavStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		NavStore.getState().isNavOpen ? openNav() : closeNav();
	}

	onToggle() {
		NavAction.toggle();
	}

	render() {
		let svgString = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">  \
	    	<path class="uac-circle" fill="none" stroke-width="2" stroke-miterlimit="10" d="M16,32h32c0,0,11.723-0.306,10.75-11c-0.25-2.75-1.644-4.971-2.869-7.151C50.728,7.08,42.767,2.569,33.733,2.054C33.159,2.033,32.599,2,32,2C15.432,2,2,15.432,2,32c0,16.566,13.432,30,30,30c16.566,0,30-13.434,30-30C62,15.5,48.5,2,32,2S1.875,15.5,1.875,32"></path> \
	    </svg> ';

	    let navSvg = '<svg data-points-hover="114.9,800.5 20,800.5 114.9,0 114.9,0 " id="nav-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 115.9 800" style="enable-background:new 0 0 115.9 800;" xml:space="preserve"> \
  		</svg>';

		return (
			<div>
				<nav id="nav">
					<ul>
						<li><Link to="home">Home</Link></li>
						<li><Link to="projectList">Projects</Link></li>
						<li><a href="http://blog.codinglife.in">Blog</a></li>
						<li><Link to="about">About</Link></li>
					</ul>
					<div id="nav-bottom">
		    			<ul id="gf-nav-social-link">
		    				<li><a href="http://github.com/shadowzheng" target="_blank">Github</a></li>
		    				<li><a href="http://weibo.com/" target="_blank">Weibo</a></li>
		    				<li><a href="http://www.zhihu.com/" target="_blank">知乎</a></li>
		    			</ul>
		    		</div>
					<div id="nav-svg-wrap" dangerouslySetInnerHTML={{__html: navSvg }}></div>
				</nav>
				<div id="nav-toggle" className="uac-toggle-barcircle" onClick={this.onToggle}> 
				  <div className="uac-top"></div>
				  <div dangerouslySetInnerHTML={{__html: svgString }}></div>
				  <div className="uac-bottom"></div> 
				</div>
			</div>
		)
	}
}