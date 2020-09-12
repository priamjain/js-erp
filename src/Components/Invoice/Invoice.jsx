import React from 'react'
import Input from './Input'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
export class Invoice extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 clientName:"",
			 clientAddress:"",
			 clientGSTIN:"",
			 paymentMethod:"",
			 invoiceNumber:"",
			 items:[],
			 totalAmount:0,
			 int:0,
			 sgst:0,
			 cgst:0,
			 igst:0
		}
	}


	handleChange = (key,event) =>{
		this.setState({
			[key]:event.target.value
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
					</Switch>
				</Router>
			</div>
		)
	}
}

export default Invoice