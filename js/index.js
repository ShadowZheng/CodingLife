'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('./routes.js');


var isFirstRun = true;

var sharedData = {};

var leaveAnimRoutes = ['home', 'about'];

var longLoad = ['projects'];

var noLoadFromThose = ['project'];

var loadUrl = {
	projects: 'data/projects.json',
	project: 'data/projects.json'
};

var previousRoute;

var xhrLoadDone, routeAnimationDone;

Router.run(routes, function(Handler, state) {
	var routeName = state.routes[state.routes.length - 1].name;
	// 每当路由改变这里都会运行一次，可以在这里检查哪些需要载入动画，以及关闭侧栏
	navActions.toggle('close');

	if (longLoad.indexOf(routeName) > -1 && noLoadFromThose.indexOf(previousRoute) == -1) {
		var preLoadedData;

		routeCoverActions.start();
	};
})

