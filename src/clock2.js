import React, {Component} from 'react';
import {Alert, Button} from 'reactstrap';
import SockJsClient from 'react-stomp';
//import StompClient from "react-stomp-client";

import './clock.css';
import { connect } from "react-redux";
import {getTodos} from './redux/selectors'
const host = window.location.hostname;
const port = window.location.port;
const URL = 'ws://'+ host + ':' + port + '/websocket';
const items = [
	  {
	    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
	    altText: 'Slide 1',
	    caption: 'Slide 1'
	  },
	  {
	    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
	    altText: 'Slide 2',
	    caption: 'Slide 2'
	  },
	  {
	    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
	    altText: 'Slide 3',
	    caption: 'Slide 3'
	  }
	];

class Clock2 extends Component {
	 defaultitem = {
			    email: '',
			    password: '',
			    text: ''
			  };	
	constructor (props) {
		super (props);
		this.state = {date: new Date(),
		 			  last: [],
		 			  item : this.defaultitem,
		 			  msg: '',
		 			  latestMessage: null,		 			  
						};
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleMessage = this.handleMessage.bind(this);
	}
    handleMessage(stompMessage) {
	    this.setState({
		    latestMessage: stompMessage
		});
	}	
    sendStompMessage = () => {
    	console.log ("stomp send....");
        this.clientRef.sendMessage('/app/userall', 'send stomp message send...');
    };    
	ws = new WebSocket(URL);
	tick() { 
		this.setState({date: new Date()});  
	}
	componentDidMount() {
	 this.ws.onopen = () => {
	      console.log('ws connected')
	   }
	 this.ws.onmessage = ev => {
	      //let  msg = JSON.parse(ev.data);
	      //console.log('msg=' + ev.data);
	      this.setState({msg: ev.data});
	    }
	 this.ws.onclose = () => {
	     console.log('ws disconnected');
	     // automatically reconnect
	     setTimeout (()=> {
	    	 console.log ('reconnect');
			 this.setState({
				  ws: new WebSocket(URL),
				 });	
	     }, 3000);
		 }
	 this.ws.onerror = (e) => {
		 console.log ('ws error');
		 this.ws.close();
	     // automatically reconnect
	     setTimeout (()=> {
	    	 console.log ('reconnect');
			 this.setState({
				  ws: new WebSocket(URL),
				 });	
	     }, 3000);		 
	 }
	  this.timerID = setInterval(() => this.tick(), 1000);
	}	
	componentWillUnmount() { 
	    clearInterval(this.timerID);
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
	       // alert ("item submit" + this.state.item.email + ", " + this.state.item.password);
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
	    const {msg, latestMessage } = this.state;
		let l = this.props.s.lists;
		return (
		<div>
			<div className="Clock">{this.state.date.toLocaleTimeString()}/{this.props.s.counter}
			<p><ul>{l.map((v,k)=><li>item:{v.name}-{k}</li>)}</ul></p>
			</div>
	    	<div>
	    	<Alert color="danger" fade="true">
	    	     ws message= {msg || '<no message>'}
	    	</Alert>
	    	</div>	
	    	<div>
	    	<Alert color="danger" fade="true">
	    	     stomp message= {latestMessage || '<no message>'}
	    	</Alert>
	    	</div>		    	
	        <div>
	        <span><Button color="primary" onClick={this.sendStompMessage}>STOMPSEND</Button></span>
	            <SockJsClient url='http://localhost:8080/ws'  topics={['/topic/user']}
	            onConnect={() => {
	                this.setState ({latestMessage: "STOMP connected"});	            	
	            	} 
	            }
	            onDisconnect={() => { 
	                this.setState ({latestMessage: "STOMP disconnected"});
	            	
	            	} 
	            }
	            onMessage={ (msg) => {
	                this.setState ({latestMessage: msg});
	            } 
	            }
	            ref={(client) => {
	                this.clientRef = client
   	            }
	            }/>	        
	      </div>	    	
		</div>
		);
	}
}
// state to props
export default connect (getTodos) (Clock2);

