import React from 'react'
import './Invoice.css'
function Input({input,handleChange,addNew,updateItem,deleteItem}) {
	let amount = input.items.reduce((a,b)=>a+(b['ppu']*b['quantity']),0);
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
			<div>
				<table className="information">
					<tbody>
						<tr>
							<td>Client Name:</td>
							<td><input className="info-text no-print" type="text" value={input.clientName} onChange={e=>{handleChange('clientName',e)}} placeholder="Client Name"/></td>
						</tr>
						<tr>
							<td>Client GSTIN:</td>
							<td><input className="info-text" type="text" value={input.clientGSTIN} onChange={e=>{handleChange('clientGSTIN',e)}} placeholder="Client GSTIN"/></td>
						</tr>
						<tr>
							<td style={{'vertical-align':'top','padding-top':'10px'}}>Client Address:</td>
							<td><textarea className="info-text" rows="3" value={input.clientAddress} onChange={e=>{handleChange('clientAddress',e)}} placeholder="Client Address"/></td>
						</tr>
						<tr>
							<td>Payment Method:</td>
							<td><input className="info-text" type="text" value={input.paymentMethod} onChange={e=>{handleChange('paymentMethod',e)}} placeholder="Payment Method"/></td>
						</tr>
					</tbody>
				</table>
				<table className="information">
					<tbody>
						<tr>
							<td>Invoice Number:</td>
							<td><input className="info-text" type="text" style={{width:"100px"}}value={input.invoiceNumber} onChange={e=>{handleChange('invoiceNumber',e)}} placeholder="Invoice No."/></td>
						</tr>
						<tr>
							<td>Date:</td>
							<td><input type="date"/></td>
						</tr>
					</tbody>
				</table>
					
					
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
							<td><button className="delete-item" onClick={(e)=>deleteItem(item.id,e)}>-</button><div>{index+1}</div></td>
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
			</table>
			<div className="result">
				<div className="result-info">
					<div>
						Total Amount:
					</div>
					<div>
						GST % :
					</div>
					<div>
						GST Amount:
					</div>
					<div>
						Amount to be Paid:
					</div>
				</div>
				<div className="result-info">
					<div>
						Rs. {amount}
					</div>
					<div>
						<input type="text" className="update-item-text" value={input.gst} onChange={e=>{handleChange('gst',e)}} placeholder="GST"/>
					</div>
					<div>
						Rs. {(amount*input.gst/100)}
					</div>
					<div>
						Rs. {amount-(amount*input.gst/100)}
					</div>
				</div>
			</div>
		</div>
		)
}

export default Input