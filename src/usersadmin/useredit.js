import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import { Row, Col } from 'reactstrap';
const host = window.location.hostname;
const ws = 'http://' + host + ':8080/data/userslist';
const ws2 = 'http://' + host + ':8080/data/roleslist';

class UserEdit extends Component {
	 defaultitem = {
			    username: '',
			    password: '',
			    enabled: true,
			    roles: [],
			  };
	 tdata = {
			   a: '1',
			   b: [ {c: 2}],
	 }
	 constructor(props) {
		    super(props);
		    this.state = {
		      t: this.tdata,
		      item: this.defaultitem,
		      roles: [],
		      role: {role: 'GUEST'},
		      notready: true,
		    };
		    this.handleChange = this.handleChange.bind(this);
		    this.handleSubmit = this.handleSubmit.bind(this);
		  }	
	  async componentDidMount() {
	    if (this.props.match.params.id !== 'new')  {
		      const user = await (await fetch(ws +`/${this.props.match.params.id}`)).json();
		      this.setState({item: user}); // get current item 
		    }
		const response = await fetch (ws2);
		const body = await response.json();
		this.setState({roles: [{"id":0, "name": ''}].concat (body)});
	  }	 
	  
	  handleChange(event) {
		    const target = event.target;
		    const value = target.value;
		    const name = target.name;
		    let item = {...this.state.item};
		    item[name] = value; // set 
		    if (name == 'role') {
		    	this.setState ({role: value});
		    } else {
		    this.setState({item});
		    }
		    this.setState({notready: false});
	  }

	  async handleSubmit(event) {
		    event.preventDefault();
		    const {item,role, roles} = this.state;
		    item.roles.push(roles.find(v => v.name == role));
		    let u = ws + '/' + ((item.id) ? `${this.props.match.params.id}` :'');
		    await fetch(u , {
		      method: (item.id) ? 'PUT' : 'POST', // update-add
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		      body:  JSON.stringify(item)
		    }).then(
		            (result) => {
		            	console.log ("result: " + JSON.stringify(result))
		                this.setState({
		                  error: false,
		                });
		              },
		              (error) => {
		            	console.log ("error: " + error)
		                this.setState({
		                  error: true,
		                });
		              }
		            )
		    this.props.history.push('/userlist');
		  }	  
	  
	  
	  render () {
		    const {item, notready, role} = this.state;
		    const title = <h2>{item.id ? 'Edit User' : 'Add User'}</h2>;
		    return (
		      <div>
		      <Container>
		        {title}
		        <Form onSubmit={this.handleSubmit}>
		        <Table styles="text-align:left" borderless>
		        <tr>
		          <FormGroup row>
		            <td><Label for="username">UserName</Label></td>
		            <td><Input type="text" name="username" size="32" id="username" value={item.username || ''}  
		            placeholder="username" onChange={this.handleChange}/></td>
		          </FormGroup>
		       </tr>
		       <tr>
		          <FormGroup row>
		          	<td><Label for="password">Password</Label></td>
		            <td><Input type="password" name="password" size="32" id="password"  value={item.password || ''}
		            placeholder="password" onChange={this.handleChange} /></td>
		          </FormGroup>
		       </tr>
		       <tr>
			      <FormGroup row>
			       <td><Label for="enabled" sm={2}>Enabled</Label></td>
 			       <td><Input type="checkbox" name="enabled" id="enabled" value={item.enabled}
			        onChange={this.handleChange}/></td>
 			      </FormGroup>
 			   </tr>
 			   <tr>
			      <FormGroup row>
			        <Row>
				       <td><Label for="roles" sm={2}>Roles</Label></td>
	 			       <td><Input type="select" name="role" id="role" value={role || ''}
				        onChange={this.handleChange} >
	 			        {this.state.roles.map ((role) => (<option key={role.id}>{role.name}</option>))};
	 			       </Input></td>
			        </Row>
			      </FormGroup>	
			   </tr>	 			   
 			   <tr>
			      <FormGroup row>
			        <Row>
			        <td><Button color="primary" type="submit" disabled={notready}>Save</Button></td>
			        <td><Button color="secondary" tag={Link} to="/userlist">Cancel</Button></td>
			        </Row>
			      </FormGroup>	
			   </tr>		   
			   </Table>
		       </Form>
		    
		       </Container>
		        </div>
		    )
	  }
	
}

export default withRouter(UserEdit);

