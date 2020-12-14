import React, {Component} from 'react';
import { Button, Form, Col } from 'react-bootstrap';

import './clock.css';
import { connect } from "react-redux";
import {getTodos} from './redux/selectors'
const host = window.location.hostname;
const port = window.location.port;
const URL = 'ws://'+ host + ':' + port + '/websocket';
class Clock extends Component {
	 defaultitem = {
			    email: '',
			    password: '',
			    text: ''
			  };	
	constructor (props) {
		super (props);
		this.state = {
		 			  item : this.defaultitem,
						};
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleChange(event) {
		    const target = event.target;
		    const value = target.value;
		    const name = target.id;
		    let item = {...this.state.item};		    
		    item[name] = value;
		    this.setState({item});
	  }	
	  
	  handleSubmit() {
	        alert ("item submit: " + this.state.item.email + ", " + this.state.item.password + ", " + this.state.item.text);
	        const ex = /\S+@\S+/;
	        let validEmail = ex.test(String(this.state.item.email).toLowerCase());	   
	        if (! validEmail) {console.log ("errror")};
		    let item = {};		    
		    item.email ='';
		    item.password= '';
		    item.text='';
		    this.setState({item});	   
		    
	  }
	
	render () {
		return (
		<div>
			<Form >
			<Form.Row>
			  <Form.Group as={Col} controlId="email">
			    <Form.Label size='sm'>Email address</Form.Label>
			    <Form.Control type="email" placeholder="Enter email" value={this.state.item.email} onChange={this.handleChange}/>
			  </Form.Group>
			  <Form.Group as={Col} controlId="password">
			    <Form.Label size='sm'>Password</Form.Label>
			    <Form.Control type="password" placeholder="Password" value={this.state.item.password} onChange={this.handleChange} />
			  </Form.Group>
			  </Form.Row>					    
			  <Form.Group  controlId="checked">
			    <Form.Check type="checkbox" label="Check me out" />
			  </Form.Group>	    
			    <Form.Group controlId="text">
			    <Form.Row>
			    <Form.Label column="sm" lg={2}>
			      Small Text
			    </Form.Label>
			    <Col xs={4}>
			      <Form.Control disabled={false} size="sm" type="text" placeholder="enter text" value={this.state.item.text} onChange={this.handleChange}/>
			    </Col>
			  </Form.Row>			    
			    </Form.Group>
			  <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit </Button> {' ' }
			  <Button variant="secondary"  onClick={this.handleSubmit}>TEST</Button>
			</Form>			
		</div>
		);
	}
}
// state to props
export default connect (getTodos) (Clock);

