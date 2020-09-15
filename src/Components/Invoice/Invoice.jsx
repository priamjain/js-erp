import React from 'react'
import Input from './Input'
import NewCustomer from './NewCustomer'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
export class Invoice extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 customers:[],
			 clientName:"",
			 clientAddress:"",
			 clientGSTIN:"",
			 paymentMethod:"",
			 invoiceNumber:"",
			 items:[],
			 totalAmount:0,
			 int:0,
			 sgst:9,
			 cgst:9,
			 igst:0
		}
	}
	componentDidMount = () =>{
		let customers = localStorage.getItem('customers');
		if(customers!==null){
			this.setState({'customers':[...JSON.parse(customers)]})
		}
	}
	handleChange = (key,value) =>{
		this.setState({
			[key]:value
		})
	}

	addNew = () =>{
		if(this.state.items.length<24){
		this.setState((prev)=>{
			let newItem={
				id:prev.int,
				name:"",
				hdn:"",
				ppu:"",
				unit:"",
				quantity:"",
				amount:""
			}

			let items = [...prev.items,newItem]
			return({
				items:items,
				int:prev.int+1
			})

			},()=>{
				console.log([...this.state.items])
			})
	}

	}

	deleteItem=(id,event)=>{
		event.persist();
		this.setState((prev)=>{
			let index = prev.items.findIndex(item=> item.id===id);
			let newArray = [...prev.items]
			newArray.splice(index,1);
			console.log(newArray);
			return({
				items:newArray
			})
		})
	}

	updateItem=(id,key,event)=>{
		event.persist();
		this.setState((prev)=>{
			let index = prev.items.findIndex(item=> item.id===id);
			let newArray = [...prev.items];
			newArray[index][key] = event.target.value;
			return({
				items:newArray
			})
		})
	}
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path="/" exact>
							<Input 
								input={this.state} 
								handleChange={this.handleChange}
								addNew={this.addNew}
								updateItem={this.updateItem}
								deleteItem={this.deleteItem}/>
						</Route>
						<Route path="/customer/new" exact>
							<NewCustomer 
								customers={this.state.customers}
								handleChange={this.handleChange}/>
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default Invoice