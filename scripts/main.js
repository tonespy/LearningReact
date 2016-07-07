var React = require('react');
var ReactDOM = require('react-dom');

/*React Extentions(Router)*/
var ReactRouter = require('react-router');
import { browserHistory } from 'react-router'
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

/*
	NotFound
*/
import NotFound from './components/NotFound'
/*
	StorePicker
*/
import StorePicker from './components/StorePicker'
/*
	App
*/
import App from './components/App'

/*
	Routes
*/
var routes = (
	<Router history={browserHistory}>
		<Route path="/" component={StorePicker}/>
		<Route path="/store/:storeId" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));