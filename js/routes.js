var React = require('react'),
	Router = require('react-router'),
	Router = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	App = require('./app.js'),
	Home = require('./pages/Home.js'),
	Projects = require('./pages/Projects.js'),
	About = require('./pages/About.js');

module.exports = (
	<Route name="app" path="/" handler={App}>
		<Route name="home" path="/home" handler={Home} />
		<Route name="projects" path="/projects" handler={Projects}>
			<Route name="project" path=":projectUrl" handler={Project} />
		</Route>
		<Route name="about" path="/about" handler={About} />
		<DefaultRoute handler={Home} />
	</Route>
);