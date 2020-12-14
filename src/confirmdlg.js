import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';

class ConfirmDlg extends Component {
	constructor (props) {
		super (props)
		this.handleConfirm = this.fnConfirm.bind(this);		
		this.handleCancel = this.fnCancel.bind(this);
	}
	
	fnConfirm () {
		this.props.onConfirm();
	}
	fnCancel () {
		this.props.onCancel();
	}	
	render () {
		return (
			    <div>
			      <Modal isOpen={this.props.open} toggle={this.handleCancel} className='ConfirmDlg'>
			        <ModalHeader toggle={this.handleCancel}>Confirm Delete</ModalHeader>
			        <ModalBody>
			          Confirm delete!!!<br/>
			          {this.props.message.msg}<br/>
			          {this.props.message.data} <br/>
			          Id={this.props.message.idx}
			        </ModalBody>
			        <ModalFooter>
			          <Button color="primary" onClick={this.handleConfirm}>Confirm</Button>{' '}
			          <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
			        </ModalFooter>
			      </Modal>
			    </div>
		);
	}
	
}

ConfirmDlg.propTypes = {
		onConfirm: PropTypes.func.isRequired,
		onCancel: PropTypes.func.isRequired,
		open: PropTypes.bool.isRequired,
		idx: PropTypes.number,
};

export default ConfirmDlg; 




