import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Row, Col } from 'reactstrap';
const host = window.location.hostname;
//const port = window.location.port;
const ws = 'http://' + host + ':8080/data/userslist';
class UserEdit extends Component {
	 defaultitem = {
			    name: 'your name',
			    address: 'your address'
			  };
	 constructor(props) {
		    super(props);
		    this.state = {
		      item: this.defaultitem
		    };
		    this.handleChange = this.handleChange.bind(this);
		    this.handleSubmit = this.handleSubmit.bind(this);
		  }	
	  async componentDidMount() {
	    if (this.props.match.params.idx !== 'new')  {
		      const dbx = await (await fetch(ws +`/${this.props.match.params.idx}`)).json();
		      this.setState({item: dbx}); // get current item 
		    }
	  }	 
	  handleChange(event) {
		    const target = event.target;
		    const value = target.value;
		    const name = target.name;
		    let item = {...this.state.item};
		    item[name] = value; // set 
		    this.setState({item});
	  }
	  async handleSubmit(event) {
		    event.preventDefault();
		    const {item} = this.state;
		    let u = ws + '/' + ((item.idx) ? `${this.props.match.params.idx}` :'');
		    await fetch(u , {
		      method: (item.idx) ? 'PUT' : 'POST', // update-add
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		      body:  JSON.stringify(item)
		    });
		    this.props.history.push('/');
		  }	  
	  
	  
	  render () {
		    const {item} = this.state;
		    const title = <h2>{item.idx ? 'Edit Group' : 'Add Group'}</h2>;
		    return (
		      <div>
		      <Container>
		        {title}
		        <Form onSubmit={this.handleSubmit}>
		        <Row form>
		         <Col md={3}>
		          <FormGroup>
		            <Label for="idx">id</Label>
		            <Input type="text" name="idx" id="idx" value={item.idx || ''}  
		            onChange={this.handleChange}/>		          
		          </FormGroup>
		            </Col>
		        </Row>
		        <Row form>
		         <Col md={5}>
		          <FormGroup>
		            <Label for="name">Name</Label>
		            <Input type="text" name="name" id="name"  value={item.name || ''}
		            onChange={this.handleChange} />		          
		          </FormGroup>
		         </Col>
		         <Col md={5}>
			      <FormGroup>
			        <Label for="name">Address</Label>
			        <Input type="text" name="address" id="address" value={item.address || ''}
			        onChange={this.handleChange}/>		          
			      </FormGroup>
			     </Col>
			   </Row>
			      <FormGroup>
			        <Button color="primary" type="submit">Save</Button>{' '}
			         <Button color="secondary" tag={Link} to="/">Cancel</Button>
			      </FormGroup>			        
		        </Form>
		        </Container>
		        </div>
		    )
	  }
	
}

export default withRouter(UserEdit);

