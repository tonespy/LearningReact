var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var browserHistory = require('history');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;

/*
	App
*/
var App = React.createClass({

	render: function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
});

/*
	Header
	<Header/>
*/
var Header = React.createClass({

	render: function() {
		console.log(this.props)
		return (
			<header className="top">
				<h1>Catch
					<span className="ofThe">
						<span className="of">Of</span>
						<span className="the">the</span>
					</span>
				Day</h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
		)
	}
});

/*
	Order
	<Order/>
*/
var Order = React.createClass({

	render: function() {
		return (
			<p>Order</p>
		)
	}
});

/*
	Inventory
	<Inventory/>
*/
var Inventory = React.createClass({

	render: function() {
		return (
			<p>Inventory</p>
		)
	}
});

/*
	StorePicker
	This will let us make <StorePcker/>
*/

var StorePicker = React.createClass({

	render : function() {
		return (
			<form className="store-selector">
				{/*Comments Goes in here*/}
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" required />
				<input type="submit" />
			</form>
		)
	}
});

/*
	Routes
*/
var routes = (
	<Router useRouterHistory={browserHistory}>
		<Route path="/" component={StorePicker}/>
		<Route path="/store/:storeId" component={App}/>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));