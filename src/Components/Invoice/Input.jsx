import React,{useState} from 'react'
import styles from './Input.module.css'
import NewCustomer from './NewCustomer'
import NewItem from './NewItem'
import logo from '../../logo.png'
function Input({input,handleChange,addNew,updateItem,deleteItem}) {
	const [newCustomer, setNewCustomer] = useState(false);
	const [newItem, setNewItem] = useState(false);
	const setCustomer = (e) =>{
		handleChange('clientName',e.target.value);
		let customer = input.customers.filter(cust => cust.clientName===e.target.value)
		handleChange('clientAddress',customer[0]['clientAddress']);
		handleChange('clientGSTIN',customer[0]['clientGSTIN']);
	}
	let amount = input.itemsList.reduce((a,b)=>a+(b['ppu']*b['quantity']),0);
	return (
		<div>
		{newCustomer?<NewCustomer customers={input.customers} handleChange={handleChange} setNewCustomer={setNewCustomer}/>:null}
		{newItem?<NewItem items={input.itemsList} handleChange={handleChange} setNewItem={setNewItem}/>:null}
		<div className={styles.invoice}>
			<header className={styles.header}>
				<div>
					<h1 className={styles.firm_name}>
						<img src={logo} alt="LOGO" height="58px"/>
					</h1>
				</div>
				<div className={styles.header_info}>
					<div className={styles.header_address}>
					<select >
						<option>
							771, Guru Arjun Dev Nagar,
							Opp. Ahuja Sweets, Tarn Taran Road,
							Amritsar, Punjab 143001,
							India							
						</option>
						<option>
							Opposite to Gill Farms, adjacent lane to RK Marble, G.T. Road, Daburji, Punjab 143006, India
						</option>
					</select>
					</div>
					<div className={styles.header_info_span}>
						<span>GSTIN: 03ADLPJ3778N1Z1</span>
						<span>Mobile. No. : +91 9888470055</span>
					</div>
					<div className={styles.header_info_span}>
						<span>
						TAX INVOICE
						</span>
					</div>
				</div>
				
			</header>
			<hr/>
				<table border="1" className={styles.table}>
					<tbody>
						<tr>
							<td>Invoice Number: <input type="text" className={`${styles.input_text}`} style={{width:"100px"}}value={input.invoiceNumber} onChange={e=>{handleChange('invoiceNumber',e.target.value)}} placeholder="Invoice No."/></td>
							<td>Date:<input className={styles.input_date} type="date"/></td>
						</tr>
						<tr>
							<td>Client Name:</td>
							<td><select className={styles.select} value={input.clientName} onChange={(e)=>setCustomer(e)}>
								<option>--Select--</option>
								{input.customers.map(cust=>{
									return <option key={cust.clientGSTIN} name={cust.clientName}>{cust.clientName}</option>})}
							</select>
							<button type="button" className={styles.no_print} onClick={e=>setNewCustomer(true)}>Add New Customer</button></td>
							{/*<td><input type="text" value={input.clientName} onChange={e=>{handleChange('clientName',e.target.value)}} placeholder="Client Name"/></td>*/}
						</tr>
						<tr>
							<td>Client GSTIN:</td>
							<td><input type="text" className={`${styles.input_text} ${styles.info_input_text}`} value={input.clientGSTIN} onChange={e=>{handleChange('clientGSTIN',e.target.value)}} placeholder="Client GSTIN"/></td>
						</tr>
						<tr>
							<td>Client Address:</td>
							<td><textarea rows="2" className={`${styles.input_text} ${styles.info_input_text} ${styles.fixed_textarea}`} value={input.clientAddress} onChange={e=>{handleChange('clientAddress',e.target.value)}} placeholder="Client Address" /></td>
						</tr>
						<tr>
							<td>Payment Method:</td>
							<td><select className={styles.select} name="PaymentMethod" value={input.paymentMethod} onChange={e=>{handleChange('paymentMethod',e.target.value)}}>
								<option value="CREDIT">CREDIT</option>
								<option value="CASH">CASH</option>
							</select></td>
							
							{/*<td><input type="text" value={input.paymentMethod} onChange={e=>{handleChange('paymentMethod',e.target.value)}} placeholder="Payment Method"/></td>*/}
						</tr>
						
					</tbody>
				</table>
				<div className={styles.no_print}>
						<div>
							<button onClick={addNew}>Add New Row</button>
							<button type="button" className={styles.no_print} onClick={e=>setNewItem(true)}>Add New Item to List</button>
						</div>
					</div>

			<table className={`${styles.table} ${styles.main}`}>
				<div className={`${styles.watermark} ${styles.only_print}`}>RAPCA
					<br/>
					POLYX
				</div>
				<thead>
					<tr>
						<th width="50px">S No.</th>
						<th width="550px">Item</th>
						<th width="70px">HSN</th>
						<th width="70px">Quantity</th>
						<th width="100px">Rate</th>
						<th width="50px">Unit</th>
						<th width="200px">Amount</th>
					</tr>
				</thead>
				<tbody >
					<tr className={styles.main_row}>
						<td>
							<table className={`${styles.table} ${styles.main_inside}`}>
								<tbody>
									{input.itemsList.map((item,index)=>{
										return(
											<tr  key={item.id}>
												<td className={styles.item}><button className={`${styles.delete_item} ${styles.no_print}`} onClick={(e)=>deleteItem(item.id,e)}>-</button><div>{index+1}</div></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className={`${styles.table} ${styles.main_inside}`}>
								<tbody>
									{input.itemsList.map((item,index)=>{
										return(
											<tr  key={item.id}>
												<td className={styles.item}>
													<select className={styles.select} value={item.name} onChange={e=>{updateItem(item.id,"name",e)}}>
														<option>--Select--</option>
														{input.items.map(selected=>{
															return <option key={selected.itemName} name={selected.itemName}>{selected.itemName}</option>})}
													</select>
												</td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className={`${styles.table} ${styles.main_inside}`}>
								<tbody>
									{input.itemsList.map((item,index)=>{
										return(
											<tr  key={item.id}>
												<td className={styles.item}><input type="text" className={styles.input_text} value={item.hsn} onChange={e=>{updateItem(item.id,"hsn",e)}} placeholder=""/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className={`${styles.table} ${styles.main_inside}`}>
								<tbody>
									{input.itemsList.map((item,index)=>{
										return(
											<tr  key={item.id}>
												<td className={styles.item}><input type="number" className={styles.input_text} value={item.quantity} onChange={e=>{updateItem(item.id,"quantity",e)}} placeholder="Quantity"/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className={`${styles.table} ${styles.main_inside}`}>
								<tbody>
									{input.itemsList.map((item,index)=>{
										return(
											<tr  key={item.id}>
												<td className={styles.item}><input type="number" className={styles.input_text} value={item.ppu} onChange={e=>{updateItem(item.id,"ppu",e)}} placeholder="Rate"/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className={`${styles.table} ${styles.main_inside}`}>
								<tbody>
									{input.itemsList.map((item,index)=>{
										return(
											<tr  key={item.id}>
												<td className={styles.item}><input type="text" className={styles.input_text} value={item.unit} onChange={e=>{updateItem(item.id,"unit",e)}} placeholder=""/></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
						<td>
							<table className={`${styles.table} ${styles.main_inside}`}>
								<tbody>
									{input.itemsList.map((item,index)=>{
										return(
											<tr  key={item.id}>
												<td className={styles.item}>{(item.ppu * item.quantity).toFixed(2)}</td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
{/*				<tbody>
				{input.itemsList.map((item,index)=>{
					return(
						<tr className={styles.item} key={item.id}>
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
			<table className={`${styles.table} ${styles.footer}`} border="1">
				<tbody>			
				<tr>
					<td rowSpan="9" width="50%">
						<p><em>Bank Details:</em></p>
						<p><em>Name of Bank:</em> ALLAHABAD BANK</p>
						<p><em>Branch:</em> Mall Road, Amritsar</p>
						<p><em>Bank Account Number:</em> 20845505897</p>
						<p><em>IFSC Code:</em> IDIB000A618</p>
					</td>
				</tr>
				<tr>
					<td>Total Amount:</td>
					<td>Rs. {amount.toFixed(2)}</td>
				</tr>
				<tr>
					<td>CGST % :</td>
					<td><input type="number" className={styles.input_text} value={input.cgst} onChange={e=>{handleChange('cgst',e.target.value)}} placeholder="CGST"/></td>
				</tr>
				<tr>
					<td>CGST Amount:</td>
					<td>Rs. {(amount*input.cgst/100).toFixed(2)}</td>
				</tr>
				<tr>
					<td>SGST % :</td>
					<td><input type="number" className={styles.input_text} value={input.sgst} onChange={e=>{handleChange('sgst',e.target.value)}} placeholder="SGST"/></td>
				</tr>
				<tr>
					<td>SGST Amount:</td>
					<td>Rs. {(amount*input.sgst/100).toFixed(2)}</td>
				</tr>
				<tr>
					<td>IGST % :</td>
					<td><input type="number" className={styles.input_text} value={input.igst} onChange={e=>{handleChange('igst',e.target.value)}} placeholder="IGST"/></td>
				</tr>
				<tr>
					<td>IGST Amount:</td>
					<td>Rs. {(amount*input.igst/100).toFixed(2)}</td>
				</tr>
				<tr>
					<td>Amount to be Paid:</td>
					<td>Rs. {(amount+(amount*input.cgst/100)+(amount*input.sgst/100)+(amount*input.igst/100)).toFixed(1)}</td>
				</tr>
				</tbody>
			</table>
			<table className={`${styles.table} ${styles.signature}`} border="0">
				<tbody>
				<tr><td><strong>For Jain Sons</strong></td></tr>
				<tr><td height="30px"></td></tr>
				<tr><td><strong>Authorised Signature</strong></td></tr>
				</tbody>
			</table>
		</div>
		</div>
		)
}

export default Input
