import React from 'react';
import Router, {Route, DefaultRoute, RouteHandler} from 'react-router';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import ProjectList from './pages/ProjectList';
import About from './pages/About';

class App extends React.Component {
  constructor(args) {
    super(args);
  }
  render() {
  	return (
  		<div>
  			<SideBar />
  			<RouteHandler />
  		</div>
  	)
  }
}

let routes = (
	<Route handler={App}>
		<Route name="home" path="/" handler={Home} />
		<Route name="projectList" path="/projectList" handler={ProjectList} />
		<Route name="about" path="/about" handler={About} />
		<DefaultRoute handler={Home} />
	</Route>
)

Router.run(routes, Router.HashLocation, (Handler) => {
	React.render(<Handler />, document.getElementById('app'));
})

