import React, {Component, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch , } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button, Alert } from 'reactstrap';
import { connect } from "react-redux";

import './App.css';
import Clock from './clock';
import Clock2 from './clock2';
import Dbx from './dbx';
import DbxEdit from './dbxedit';
import UserList from './usersadmin/userlist';
import UserEdit from './usersadmin/useredit';

import {addCounter, toggleCounter, zeroCounter, addListAction, clearListAction} from './redux/actions'
import {getTodos} from './redux/selectors'

function Effort (props) {
	useEffect(() => {    
		  document.title = "HOME MENU"; 
	});	
	return "";
}

class App extends Component {
	  constructor(props) {
		    super(props);
		    this.state = {isOpen: false,
		    		counter: 0,
		    		toggleclock: false,
		    		togglelist: false,
		    		};
		    this.toggleclock = this.toggleclock.bind(this);
		    this.togglelist = this.togglelist.bind(this);		    
		  }
	  
	componentDidMount() {
	}
	location = window.location.pathname;
	
	test1handler = () => {
		this.props.addCounter  ();
		this.props.addListAction({name: '123456'});
	}  
	  
	test2handler = () => {
		this.props.toggleCounter() ;
		this.props.clearListAction();
	}
    toggleclock() {
		    this.setState({
		      toggleclock: !this.state.toggleclock
		    });
		  }
    togglelist() {
	    this.setState({
	      togglelist: !this.state.togglelist
	    });
	  }    
        
	render () {
		return ( 
			<div className="App">
			<Collapse isOpen={this.state.togglelist}> 
	    	<Clock2></Clock2>
	    	</Collapse>			
			<Collapse isOpen={this.state.toggleclock}> 
	    	<Clock></Clock>
	    	</Collapse>
	    	<Button color="primary" onClick={this.togglelist} style={{ marginBottom: '0.5rem' }}>List</Button>{' '}
	    	<Button color="primary" onClick={this.toggleclock} style={{ marginBottom: '0.5rem' }}>Form</Button>{' '}	    	
	    	<Button color="primary" onClick={this.test1handler} style={{ marginBottom: '0.5rem' }}>Test1</Button>{' '}
	    	<Button color="primary" onClick={this.test2handler} style={{ marginBottom: '0.5rem' }}>Test2</Button>{' '}
	    	<div>State:{this.props.s.counter}</div>
	    	<div>Location:{this.location}</div>
	    	<Navbar color="faded" expand="md">
	    	 	<NavbarBrand  to="/">Home</NavbarBrand>	    
	    	 	<NavbarToggler onClick={this.toggle}/>	    	 
	    	 		<Nav className="ml-auto" navbar>
	 					<NavItem><NavLink href="/">HOME</NavLink></NavItem>
	 					<NavItem><NavLink href="/userlist">USERADM</NavLink></NavItem>
	    	 			<NavItem><NavLink href="/logout">LOGOUT</NavLink></NavItem>
	    	 			<NavItem><NavLink href="/login">LOGIN</NavLink></NavItem>
	    	 		</Nav> 	    	
	    	 </Navbar>
	    	<Router>
	    		<Switch>
	    		    <Route path="/" exact={true} component={Dbx}/>
	    			<Route path="/effort" exact={true} component={Effort}/>
		            <Route path="/dbxedit/:idx" exact={true} component={DbxEdit}/>" 
		            <Route path="/userlist" exact={true} component={UserList}/>" 
		            <Route path="/useredit/:id" exact={true} component={UserEdit}/>"
	    		</Switch>
		    </Router>
		    </div>
		)
	}
}

// mapStateToProps, {actionCreators}
const actions =  {addCounter, toggleCounter, zeroCounter, addListAction, clearListAction};
export default connect (getTodos, actions )(App);




