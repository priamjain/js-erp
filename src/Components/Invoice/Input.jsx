import React from 'react'
import './Invoice.css'
import {Link} from 'react-router-dom'
function Input({input,handleChange,addNew,updateItem,deleteItem}) {
	const setCustomer = (e) =>{
		handleChange('clientName',e.target.value);
		let customer = input.customers.filter(cust => cust.clientName===e.target.value)
		handleChange('clientAddress',customer[0]['clientAddress']);
		handleChange('clientGSTIN',customer[0]['clientGSTIN']);
	}
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
							<td>Invoice Number: <input type="text" style={{width:"100px"}}value={input.invoiceNumber} onChange={e=>{handleChange('invoiceNumber',e.target.value)}} placeholder="Invoice No."/></td>
							<td>Date:<input type="date"/></td>
						</tr>
						<tr>
							<td>Client Name:</td>
							<td><select value={input.clientName} onChange={(e)=>setCustomer(e)}>
								<option>--Select--</option>
								{input.customers.map(cust=>{
									return <option key={cust.clientGSTIN} name={cust.clientName}>{cust.clientName}</option>})}
							</select>
							<div className="no-print"><Link to="/customer/new">Add New Customer</Link></div></td>
							{/*<td><input type="text" value={input.clientName} onChange={e=>{handleChange('clientName',e.target.value)}} placeholder="Client Name"/></td>*/}
						</tr>
						<tr>
							<td>Client GSTIN:</td>
							<td><input type="text" value={input.clientGSTIN} onChange={e=>{handleChange('clientGSTIN',e.target.value)}} placeholder="Client GSTIN"/></td>
						</tr>
						<tr>
							<td>Client Address:</td>
							<td><textarea rows="2" value={input.clientAddress} onChange={e=>{handleChange('clientAddress',e.target.value)}} placeholder="Client Address" /></td>
						</tr>
						<tr>
							<td>Payment Method:</td>
							<td><select name="PaymentMethod" value={input.paymentMethod} onChange={e=>{handleChange('paymentMethod',e.target.value)}}>
								<option value="CREDIT">CREDIT</option>
								<option value="CASH">CASH</option>
							</select></td>
							
							{/*<td><input type="text" value={input.paymentMethod} onChange={e=>{handleChange('paymentMethod',e.target.value)}} placeholder="Payment Method"/></td>*/}
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
				<tbody >
					<tr className="main-row">
						<td>
							<table className="main-inside">
								<tbody>
									{input.items.map((item,index)=>{
										return(
											<tr className="item" key={item.id}>
												<td><button className="delete-item no-print" onClick={(e)=>deleteItem(item.id,e.target.value)}>-</button><div>{index+1}</div></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className="main-inside">
								<tbody>
									{input.items.map((item,index)=>{
										return(
											<tr className="item" key={item.id}>
												<td><input type="text" value={item.name} onChange={e=>{updateItem(item.id,"name",e.target.value)}} placeholder="Item Name"/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className="main-inside">
								<tbody>
									{input.items.map((item,index)=>{
										return(
											<tr className="item" key={item.id}>
												<td><input type="text" value={item.hsn} onChange={e=>{updateItem(item.id,"hsn",e.target.value)}} placeholder=""/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className="main-inside">
								<tbody>
									{input.items.map((item,index)=>{
										return(
											<tr className="item" key={item.id}>
												<td><input type="text" value={item.quantity} onChange={e=>{updateItem(item.id,"quantity",e.target.value)}} placeholder="Quantity"/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className="main-inside">
								<tbody>
									{input.items.map((item,index)=>{
										return(
											<tr className="item" key={item.id}>
												<td><input type="text" value={item.ppu} onChange={e=>{updateItem(item.id,"ppu",e.target.value)}} placeholder="Rate"/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className="main-inside">
								<tbody>
									{input.items.map((item,index)=>{
										return(
											<tr className="item" key={item.id}>
												<td><input type="text" value={item.unit} onChange={e=>{updateItem(item.id,"unit",e.target.value)}} placeholder=""/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className="main-inside">
								<tbody>
									{input.items.map((item,index)=>{
										return(
											<tr className="item" key={item.id}>
												<td>{item.ppu * item.quantity}</td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
{/*				<tbody>
				{input.items.map((item,index)=>{
					return(
						<tr className="item" key={item.id}>
							<td><button className="delete-item no-print" onClick={(e)=>deleteItem(item.id,e.target.value)}>-</button><div>{index+1}</div></td>
							<td><input type="text" value={item.name} onChange={e=>{updateItem(item.id,"name",e.target.value)}} placeholder="Item Name"/></td>
							<td><input type="text" value={item.hsn} onChange={e=>{updateItem(item.id,"hsn",e.target.value)}} placeholder=""/></td>
							<td><input type="text" value={item.quantity} onChange={e=>{updateItem(item.id,"quantity",e.target.value)}} placeholder="Quantity"/></td>
							<td><input type="text" value={item.ppu} onChange={e=>{updateItem(item.id,"ppu",e.target.value)}} placeholder="Rate"/></td>
							<td><input type="text" value={item.unit} onChange={e=>{updateItem(item.id,"unit",e.target.value)}} placeholder=""/></td>
							<td>{item.ppu * item.quantity}</td>
						</tr>
						)
				})}
				
				</tbody>*/}
			</table>
				<div className="no-print">
						<div>
							<button onClick={addNew}>+</button>
						</div>
					</div>
			<table className="footer" border="1">
				<tbody>			
				<tr>
					<td rowSpan="9" width="50%">
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
					<td><input type="text" className="update-item-text" value={input.cgst} onChange={e=>{handleChange('cgst',e.target.value)}} placeholder="CGST"/></td>
				</tr>
				<tr>
					<td>CGST Amount:</td>
					<td>Rs. {(amount*input.cgst/100)}</td>
				</tr>
				<tr>
					<td>SGST % :</td>
					<td><input type="text" className="update-item-text" value={input.sgst} onChange={e=>{handleChange('sgst',e.target.value)}} placeholder="SGST"/></td>
				</tr>
				<tr>
					<td>SGST Amount:</td>
					<td>Rs. {(amount*input.sgst/100)}</td>
				</tr>
				<tr>
					<td>IGST % :</td>
					<td><input type="text" className="update-item-text" value={input.igst} onChange={e=>{handleChange('igst',e.target.value)}} placeholder="IGST"/></td>
				</tr>
				<tr>
					<td>IGST Amount:</td>
					<td>Rs. {(amount*input.igst/100)}</td>
				</tr>
				<tr>
					<td>Amount to be Paid:</td>
					<td>Rs. {amount+(amount*input.cgst/100)+(amount*input.sgst/100)+(amount*input.igst/100)}</td>
				</tr>
				</tbody>
			</table>
			<table className='signature' border="0">
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