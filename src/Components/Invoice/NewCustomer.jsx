import React from 'react'
import {withRouter} from 'react-router-dom'
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
		this.props.history.push('/');
	}
	render() {

		return (
			<form style={{backgroundColor:"#eee",'width':'600px','padding':'20px','margin':'auto'}} onSubmit={this.handleSubmit}>
				<p>Client Name: <input type="text" value={this.state.clientName} onChange={e=>this.setState({clientName:e.target.value})} style={{'border':'1px solid black','width':'400px'}}/></p>
				<p>Client Address: <textarea value={this.state.clientAddress} onChange={e=>this.setState({clientAddress:e.target.value})} style={{'border':'1px solid black','width':'400px'}}/></p>
				<p>Client GSTIN: <input type="text" value={this.state.clientGSTIN} onChange={e=>this.setState({clientGSTIN:e.target.value})} style={{'border':'1px solid black','width':'400px'}}/></p>
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default withRouter(NewCustomer)