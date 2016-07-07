var React = require('react');
/*Helpers*/
var h = require('../helpers');
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase'
//const ref = new Firebase('https://reactlearning-a5b09.firebaseio.com/')
var config = {
	apiKey : 'AIzaSyCh_mIM5dpY9t-mjG_XVXKaQzil1yEwmv0',
	authDomain : 'reactlearning-a5b09.firebaseapp.com',
	databaseURL : 'https://reactlearning-a5b09.firebaseio.com/'
}
var app = Firebase.initializeApp(config);
/*
	Inventory
	<Inventory/>
*/

@autobind
class Inventory extends React.Component {
    constructor() {
        super();

        this.state = {
        	uid : ''
        }
    }

    authenticate(provider) {
    	app.auth().signInWithPopup(provider).then(function(result){
    		console.log('Success: ', result);
    		console.log(this.props.params.storeId);
    	})
    	.catch(function(error){
    		console.log('Error: ', error);
    		return
    	})
    }

    renderLogin() {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's Inventory</p>
				<button className="github" 
				onClick={
					this.authenticate.bind(this, new Firebase.auth.GithubAuthProvider())
				}>
				Log In With GitHub
				</button>
				<button className="facebook" 
				onClick={
					this.authenticate.bind(this, new Firebase.auth.FacebookAuthProvider())
				}>
				Log In With Facebook</button>
				<button className="twitter" onClick={
					this.authenticate.bind(this, new Firebase.auth.TwitterAuthProvider())
				}>
				Log In With Twitter</button>
			</nav>
		)
	}

	renderInventory(key) {
		var linkState = this.props.linkState;
		return (
			<div className="fish-edit" key={key}>
				<input type="text" valueLink={linkState('fishes.'+ key +'.name')} />
				<input type="text" valueLink={linkState('fishes.'+ key +'.price')} />
				<select valueLink={linkState('fishes.'+ key +'.status')}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" valueLink={linkState('fishes.'+ key +'.desc')} placeholder="Desc"></textarea>
				<input type="text" valueLink={linkState('fishes.'+ key +'.image')} placeholder="URL to Image"/>
				<button type="submit" onClick={this.props.removeFish.bind(null, key)}> Remove Fish </button>
			</div>
		)
	}

    render() {

    	let logoutButton = <button>Log Out!</button>

    	//Check If they're logged In
    	if (!this.state.uid) {
    		return (
    			<div>
    				{this.renderLogin()}
    			</div>
    		)
    	}

    	if (this.state.uid !== this.state.owner) {
    		return (
    			<div>
    				<p>Sorry, you're not the owner of this store</p>
    				{logoutButton}
    			</div>
    		)
    	}

        return (
			<div>
				<h2>Inventory</h2>
				{logoutButton}
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm {...this.props}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
    }
};

Inventory.propTypes = {
	addFish : React.PropTypes.func.isRequired,
	loadSamples : React.PropTypes.func.isRequired,
	fishes : React.PropTypes.object.isRequired,
	linkState : React.PropTypes.func.isRequired,
	removeFish : React.PropTypes.func.isRequired
}

export default Inventory;