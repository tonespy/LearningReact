var React = require('react');
var h = require('../helpers');
import { browserHistory } from 'react-router'
import autobind from 'autobind-decorator';

/*
	StorePicker
	This will let us make <StorePcker/>
*/

@autobind
class StorePicker extends React.Component {

	goToStore(event) {
		event.preventDefault();
		// Get the data from the input
		var storeId = this.refs.storeId.value;
		browserHistory.push('/store/' + storeId);
		//transition from store picker to app
	}

	render() {
        return (
        	<form className="store-selector" onSubmit={this.goToStore.bind(this)}>
				{/*Comments Goes in here*/}
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()} required />
				<input type="submit" />
			</form>
        )
    }
}

export default StorePicker;