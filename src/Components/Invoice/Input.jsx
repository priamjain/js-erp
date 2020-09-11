import React from 'react'
import './Invoice.css'
function Input({input,handleChange,addNew,updateItem,deleteItem}) {
	return (
		<div className="input">
			<header>
				<div>
					<h1>
						JAIN SONS
					</h1>
				</div>
				<div className="header-info">
					<p>
							771, Guru Arjun Dev Nagar,
							Opp. Ahuja Sweets, Tarn Taran Road,
							Amritsar, Punjab 143001,
							India							
					</p>
					<div>
						<span>GSTIN: AAAAAAAAA$$$$$$$$$</span>
						<span>Mobile Number: +91 9888470055</span>
					</div>
				</div>
			</header>
			<hr/>
			<div className="information">
				<div>
					<input className="info-text" type="text" value={input.clientName} onChange={e=>{handleChange('clientName',e)}} placeholder="Client Name"/><br/>
					<input className="info-text" type="text" value={input.clientGSTIN} onChange={e=>{handleChange('clientGSTIN',e)}} placeholder="Client GSTIN"/><br/>
					<textarea className="info-text" rows="3" value={input.clientAddress} onChange={e=>{handleChange('clientAddress',e)}} placeholder="Client Address"/><br/>
					<input className="info-text" type="text" value={input.paymentMethod} onChange={e=>{handleChange('paymentMethod',e)}} placeholder="Payment Method"/>
				</div>
				<div>
					Invoice Number: <input className="info-text" type="text" style={{width:"100px"}}value={input.invoiceNumber} onChange={e=>{handleChange('invoiceNumber',e)}} placeholder="Invoice No."/><br/>
					Date: <input type="date"/>
				</div>
				
			</div>
			<table>
				<thead className="highlight">
					<tr>
						<th>S No.</th>
						<th>Item</th>
						<th>HDN</th>
						<th>Price per Unit</th>
						<th>Quantity</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
				{input.items.map((item,index)=>{
					return(
						<tr className="item" key={item.id}>
							<td><button className="delete-task" onClick={(e)=>deleteItem(item.id,e)}>-</button><div>{index+1}</div></td>
							<td><input type="text" className="update-item-text" value={item.name} onChange={e=>{updateItem(item.id,"name",e)}} placeholder="Item Name"/></td>
							<td><input type="text" className="update-item-text" value={item.hdn} onChange={e=>{updateItem(item.id,"hdn",e)}} placeholder="Item HDN"/></td>
							<td><input type="text" className="update-item-text" value={item.ppu} onChange={e=>{updateItem(item.id,"ppu",e)}} placeholder="Price Per Unit"/></td>
							<td><input type="text" className="update-item-text" value={item.quantity} onChange={e=>{updateItem(item.id,"quantity",e)}} placeholder="Quantity"/></td>
							<td>{item.ppu * item.quantity}</td>
						</tr>
						)
				})}
				<tr className="no-print">
						<td>
							<button onClick={addNew}>+</button>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
					<td colSpan="6" >
					Total Amount:  {input.items.reduce((a,b)=>a+(b['ppu']*b['quantity']),0)}
					</td>
					</tr>
				</tfoot>

			</table>
		</div>
		)
}

export default Input