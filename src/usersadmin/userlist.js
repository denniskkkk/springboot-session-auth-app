import React, {Component} from 'react';
import { Button, } from 'reactstrap';
import { Link} from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';

import UserConfirmDlg from './userconfirmdlg';

const host = window.location.hostname;
//const port = window.location.port;
const ws = 'http://' + host + ':8080/data/userslist';

class UserList extends Component {
	constructor (props) {
		super (props);
		this.state = {
				users: [],
				id: '',
				isdel: false,
		};
		this.handleDelete = this.hndDelete.bind (this);
		this.handleConfirmDelete = this.userdeleteConfirm.bind(this);
		this.handleCancel = this.hndCancel.bind(this);
	}
	
	async componentDidMount() {
		const response = await fetch (ws);
		const body = await response.json();
		this.setState ({users: body});
	}
	
	hndCancel () {
		this.setState ({isdel: false});
	}
	
	hndDelete (ix) {
		console.log ("ix= " + ix);
		this.setState ({isdel: true, id: ix});
	}
	
	async userdeleteConfirm () {
	    await fetch ( ws + `/${this.state.id}` , {  
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content': 'application/json'
			}
		}).then (() => {
			this.setState ({users:  [...this.state.users].filter(i => i.id !== this.state.id) , isdel: false, id: ''});		
		}).then (()=>{
			this.setState ({isdel: false, id: ''});	
		});
	}	
	
	render () {
		const {users, id} = this.state;
		return (<div className="UserList">
	
		<div>
	    <UserConfirmDlg message={{ msg : 'messages...', data: 'data....', id: id}}
	       open={this.state.isdel} onConfirm={() =>this.handleConfirmDelete ()} onCancel={this.handleCancel}>
	    </UserConfirmDlg>		
	    </div>
	    
	    <div>
	    <Button color="primary" mt={1} tag={Link} to='/useredit/new' >ADDUSER</Button>{' '}
	    </div>
	    
	    <div>
		<DataTable data={users}
		title="User Table" disabled={false}
		columns={[
			{name: 'id', selector:'id', sortable: true,},
			{name: 'username', selector: 'username', sortable: true,} ,
			{name: 'enabled', sortable: false,
				cell: row =><div>{ (row.enabled) ? "ENABLED": "DISABLED"} </div>,},
			{ignoreRowClick: true, allowOverflow: true, button: true,
			  cell: row =><Button color="success" tag={Link} to={"/useredit/"+row.id} id={row.id}>Edit</Button>,
		    },	
			{ignoreRowClick: true, allowOverflow: true, button: true,
			  cell: row =><Button color="success" onClick={(e) =>this.handleDelete(row.id)} id={row.id}>Delete</Button>,
			},			
		]}
		Clicked 
		/>
		</div>

		</div>);
	}
}

export default UserList;