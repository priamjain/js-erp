import React from 'react'
import styles from './New.module.css'

export class NewItem extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 itemName:""
		}
	}
	handleSubmit = (e) =>{
		e.preventDefault();
		let items = localStorage.getItem('items');
		items=items!==null?[...JSON.parse(items),{...this.state}]:[{...this.state}];
		localStorage.setItem('items',JSON.stringify(items));
		this.props.handleChange('items',items);
		this.props.setNewItem(false)
	}
	render() {

		return (
			<div className={styles.main} onClick={(e)=>{this.props.setNewItem(false)}}>
			<form className={styles.form} onSubmit={this.handleSubmit} onClick={e=>e.stopPropagation()}>
				<p>Product Name: <input type="text" className={styles.input_text} value={this.state.itemName} onChange={e=>this.setState({itemName:e.target.value})} /></p>
				<div className={styles.buttons}><button className={styles.submit} type="submit">Save</button><div className={styles.cancel} onClick={(e)=>{this.props.setNewItem(false)}}>Cancel</div></div>
			</form>
			</div>
		)
	}
}

export default NewItem;