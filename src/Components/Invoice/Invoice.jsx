import React from 'react'
import Input from './Input'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
export class Invoice extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 items:[],
			 customers:[],
			 clientName:"",
			 clientAddress:"",
			 clientGSTIN:"",
			 paymentMethod:"",
			 invoiceNumber:"",
			 itemsList:[],
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
		let items = localStorage.getItem('items');
		if(items!==null){
			this.setState({'items':[...JSON.parse(items)]})
		}
	}
	handleChange = (key,value) =>{
		this.setState({
			[key]:value
		})
	}

	addNew = () =>{
		if(this.state.itemsList.length<24){
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

			let itemsList = [...prev.itemsList,newItem]
			return({
				itemsList:itemsList,
				int:prev.int+1
			})

			})
	}

	}

	deleteItem=(id,event)=>{
		event.persist();
		this.setState((prev)=>{
			let index = prev.itemsList.findIndex(item=> item.id===id);
			let newArray = [...prev.itemsList]
			newArray.splice(index,1);
			console.log(newArray);
			return({
				itemsList:newArray
			})
		})
	}

	updateItem=(id,key,event)=>{
		event.persist();
		this.setState((prev)=>{
			let index = prev.itemsList.findIndex(item=> item.id===id);
			let newArray = [...prev.itemsList];
			newArray[index][key] = event.target.value;
			return({
				itemsList:newArray
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
					</Switch>
				</Router>
			</div>
		)
	}
}

export default Invoice