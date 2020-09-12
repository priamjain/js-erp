import React from 'react'
import Input from './Input'
import Preview from './Preview'
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
			 gst:0
		}
	}


	handleChange = (key,event) =>{
		this.setState({
			[key]:event.target.value
		})
	}

	addNew = () =>{
		this.setState((prev)=>{
			let newItem={
				id:prev.int,
				name:"",
				hdn:"",
				ppu:0,
				quantity:0,
				amount:0
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
						<Route path="/preview">
							<Preview/>
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default Invoice