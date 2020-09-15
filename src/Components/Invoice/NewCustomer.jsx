import React from 'react'
import styles from './NewCustomer.module.css'

export class NewCustomer extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 clientName:"",
			 clientAddress:"",
			 clientGSTIN:""
		}
	}
	handleSubmit = (e) =>{
		e.preventDefault();
		let customers = localStorage.getItem('customers');
		customers=customers!==null?[...JSON.parse(customers),{...this.state}]:[{...this.state}];
		localStorage.setItem('customers',JSON.stringify(customers));
		this.props.handleChange('customers',customers);
		this.props.setModal(false)
	}
	render() {

		return (
			<div className={styles.main} onClick={(e)=>{this.props.setModal(false)}}>
			<form className={styles.form} onSubmit={this.handleSubmit} onCLick={e=>e.stopPropagation()}>
				<p>Client Name: <input type="text" className={styles.input_text} value={this.state.clientName} onChange={e=>this.setState({clientName:e.target.value})} /></p>
				<p>Client Address: <textarea className={styles.input_textarea} value={this.state.clientAddress} onChange={e=>this.setState({clientAddress:e.target.value})} /></p>
				<p>Client GSTIN: <input type="text" className={styles.input_text} value={this.state.clientGSTIN} onChange={e=>this.setState({clientGSTIN:e.target.value})} /></p>
				<div className={styles.buttons}><button className={styles.submit} type="submit">Save</button><div className={styles.cancel} onClick={(e)=>{this.props.setModal(false)}}>Cancel</div></div>
			</form>
			</div>
		)
	}
}

export default NewCustomer;