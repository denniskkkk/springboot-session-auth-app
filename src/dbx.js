import React, {Component} from 'react';
import './dbx.css';
import { Button, } from 'reactstrap';
import { Link} from 'react-router-dom';
import ConfirmDlg from './confirmdlg';
import DataTable, { createTheme } from 'react-data-table-component';
const host = window.location.hostname;
//const port = window.location.port;
const ws = 'http://' + host + ':8080/data/list';

createTheme('dbxtheme', {
	  text: {
	    primary: '#000000',
	    secondary: '#805000',
	  },
	  background: {
	    default: '#ffffff',
	  },
	  context: {
	    background: '#cb4b16',
	    text: '#FFFFFF',
	  },
	  divider: {
	    default: '#073642',
	  },
	  action: {
	    button: 'rgba(0,0,0,.54)',
	    hover: 'rgba(0,0,0,.08)',
	    disabled: 'rgba(0,0,0,.12)',
	  },
	});

class Dbx extends Component {
	constructor (props) {
		super (props);
		this.state = {
				dbx: [],
				isdelete:false,
				idx: '',
				col: [],		
				};
		this.handleClick = this.handleCheck.bind (this);
		this.handleDelete = this.fnDelete.bind (this);
		this.handleConfirm = this.fnConfirm.bind (this);		
		this.handleCancel = this.fnCancel.bind(this);
		this.handleTest = this.fnTest.bind(this);
	}
	
	async dbxmap () {
		const response = await fetch ( ws);
		const body = await response.json ();	
		this.setState ({dbx: body});
	}
    componentDidMount () {
		this.dbxmap();
	}
	handleCheck ( e) {
		this.setState(state => ({
			check: !state.check
			}));
		console.log ("check");
		e.preventDefault();
	}	
	fnDelete (ix) {
		this.setState ({isdelete: true});
		this.setState ({idx: ix});
	}
	async fnConfirm () {
	    await fetch ( ws + `/${this.state.idx}` , {  // becare of "`" non=literal mark process ${} variables
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content': 'application/json'
			}
		}).then (() => {
			this.setState ({dbx:  [...this.state.dbx].filter(i => i.idx !== this.state.idx) , isdelete: false, idx: ''});		
		}).then (()=>{
			this.setState ({isdelete: false, idx: ''});	
			//this.props.history.go(0);
		});
	}

	fnCancel () {
		this.setState ({isdelete: false});
	}
	
	fnTest (id) {
		console.log ( id );
	}
	render () {
		const { dbx, idx} = this.state;	
		return ( 
		    <div className="Dbx">
		    <ConfirmDlg message={{ msg : 'messages...', data: 'data....', idx: idx}}
		       open={this.state.isdelete} onConfirm={() =>this.handleConfirm ()} onCancel={this.handleCancel}>
		    </ConfirmDlg>
		    <div>
		    <Button color="primary" mt={1} tag={Link} to='/dbxedit/new' >AddITEM</Button>{' '}
		    <Button color="primary" onClick={this.handlePurge} disabled='false'>Refresh</Button>				  
		    </div>
		    <div>
			<DataTable
			  data={this.state.dbx}
			  title="DBX"
			  columns={ [
			  	      {name: 'idx', selector: 'idx', sortable: true, },
					  {name: 'name', selector: 'name', sortable: true,right: true, },
					  {name: 'address',selector: 'address',sortable: true,	right: true, },	  
					  {name: 'action',sortable: false,cell: row => <div>{row.idx}-{row.name}</div>, },
					  {ignoreRowClick: true, allowOverflow: true, button: true,
						  cell: row =><Button color="success" tag={Link} to={"/dbxedit/"+row.idx} id={row.id}>Edit</Button>,
					  },	
					  {ignoreRowClick: true, allowOverflow: true, button: true,
						cell: row =><Button color="success" onClick={(e) =>this.handleDelete(row.idx)} id={row.id}>Delete</Button>,
					   },					  
					]}
			  theme="dbxtheme"
			  selectableRows
			  Clicked
			  expandableRows
			  expandableRowDisabled={row => row.disabled}      
			  pagination={true}
			  paginationPerPage={25}
			/>  
			</div> 
		    </div>
		)
	}
}

export default Dbx;
