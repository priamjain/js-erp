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
						<span>GSTIN: 03ADLPJ3778N1Z1</span>
						<span>Mobile Number: +91 9888470055</span>
					</div>
				</div>
			</header>
			<hr/>
				<table border="1">
					<tbody>
						<tr>
							<td>Invoice Number: <input type="text" style={{width:"100px"}}value={input.invoiceNumber} onChange={e=>{handleChange('invoiceNumber',e)}} placeholder="Invoice No."/></td>
							<td>Date:<input type="date"/></td>
						</tr>
						<tr>
							<td>Client Name:</td>
							<td><input type="text" value={input.clientName} onChange={e=>{handleChange('clientName',e)}} placeholder="Client Name"/></td>
						</tr>
						<tr>
							<td>Client GSTIN:</td>
							<td><input type="text" value={input.clientGSTIN} onChange={e=>{handleChange('clientGSTIN',e)}} placeholder="Client GSTIN"/></td>
						</tr>
						<tr>
							<td>Client Address:</td>
							<td><textarea rows="3" value={input.clientAddress} onChange={e=>{handleChange('clientAddress',e)}} placeholder="Client Address"/></td>
						</tr>
						<tr>
							<td>Payment Method:</td>
							<td><input type="text" value={input.paymentMethod} onChange={e=>{handleChange('paymentMethod',e)}} placeholder="Payment Method"/></td>
						</tr>
						
					</tbody>
				</table>
			<table className='main'>
				<thead>
					<tr>
						<th width="40px">S No.</th>
						<th width="600px">Item</th>
						<th width="70px">HSN</th>
						<th width="70px">Quantity</th>
						<th width="100px">Rate</th>
						<th width="50px">Unit</th>
						<th width="200px">Amount</th>
					</tr>
				</thead>
				<tbody>
				{input.items.map((item,index)=>{
					return(
						<tr className="item" key={item.id}>
							<td><button className="delete-item no-print" onClick={(e)=>deleteItem(item.id,e)}>-</button><div>{index+1}</div></td>
							<td><input type="text" value={item.name} onChange={e=>{updateItem(item.id,"name",e)}} placeholder="Item Name"/></td>
							<td><input type="text" value={item.hsn} onChange={e=>{updateItem(item.id,"hsn",e)}} placeholder=""/></td>
							<td><input type="text" value={item.quantity} onChange={e=>{updateItem(item.id,"quantity",e)}} placeholder="Quantity"/></td>
							<td><input type="text" value={item.ppu} onChange={e=>{updateItem(item.id,"ppu",e)}} placeholder="Rate"/></td>
							<td><input type="text" value={item.unit} onChange={e=>{updateItem(item.id,"unit",e)}} placeholder=""/></td>
							<td>{item.ppu * item.quantity}</td>
						</tr>
						)
				})}
				
				</tbody>
			</table>
				<div className="no-print">
						<div>
							<button onClick={addNew}>+</button>
						</div>
					</div>
			<table className="footer" border="1">
				<tbody>			
				<tr>
					<td rowSpan="7" width="50%">
						<p><strong>Bank Details:</strong></p>
						<p>Name of Bank: <strong>ALLAHABAD BANK</strong></p>
						<p>Branch: <strong>Mall Road, Amritsar</strong></p>
						<p>Bank Account Number: <strong>20845505897</strong></p>
						<p>IFSC Code: <strong>ALLA0210443</strong></p>
					</td>
				</tr>
				<tr>
					<td>Total Amount:</td>
					<td>Rs. {amount}</td>
				</tr>
				<tr>
					<td>CGST % :</td>
					<td><input type="text" className="update-item-text" value={input.cgst} onChange={e=>{handleChange('cgst',e)}} placeholder="CGST"/></td>
				</tr>
				<tr>
					<td>CGST Amount:</td>
					<td>Rs. {(amount*input.cgst/100)}</td>
				</tr>
				<tr>
					<td>SGST % :</td>
					<td><input type="text" className="update-item-text" value={input.sgst} onChange={e=>{handleChange('sgst',e)}} placeholder="SGST"/></td>
				</tr>
				<tr>
					<td>SGST Amount:</td>
					<td>Rs. {(amount*input.sgst/100)}</td>
				</tr>
				<tr>
					<td>Amount to be Paid:</td>
					<td>Rs. {amount-(amount*input.cgst/100)-(amount*input.sgst/100)}</td>
				</tr>
				</tbody>
			</table>
			<table className='signature'>
				<tbody>
				<tr><td><strong>For Jain Sons</strong></td></tr>
				<tr><td height="30px"></td></tr>
				<tr><td><strong>Authorised Signature</strong></td></tr>
				</tbody>
			</table>
		</div>
		)
}

export default Input