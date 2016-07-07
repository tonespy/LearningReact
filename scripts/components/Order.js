var React = require('react');
var CSSTransitionGroup = require('react-addons-css-transition-group');
/*Helpers*/
var h = require('../helpers');

/*
	Order
	<Order/>
*/
var Order = React.createClass({
	renderOrder : function (key) {
		var fish = this.props.fishes[key];
		var count = this.props.order[key];
		var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>
		if (!fish) {
			return <li key={key}>Sorry, fish no longer available! {removeButton}</li>
		}

		return (
			<li key={key}>
				{count}lbs
				{fish.name}
				<span className="price">{h.formatPrice(count * fish.price)}</span>
				{removeButton}
			</li>
		)
	},
	render: function() {
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key)=> {
			var fish = this.props.fishes[key];
			var count = this.props.order[key];
			var isAvailable = fish && fish.status === 'available';

			if (fish && isAvailable) {
				return prevTotal + (count * parseInt(fish.price) || 0);
			}

			return prevTotal;
		}, 0);
		return (
			<div className="order-wrap">
				<h2 className="order-title">Your Order</h2>
				<CSSTransitionGroup 
					className="order" 
					component="ul" 
					transitionName="order" 
					transitionEnterTimeout={5000}
					transitionLeaveTimeout={5000}
					>
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</CSSTransitionGroup>
			</div>
		)
	}
});

export default Order;