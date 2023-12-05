import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import adimg from '../../img/adimg.jpeg'
import Image from 'next/image'

export const metadata = {
    title: 'iTruth News - Advertise',
    description: 'Promote your work effectively with iTruth News. Explore tailored advertising solutions, reaching a diverse audience with precision. Your gateway to showcasing your offerings, backed by accurate insights and timely exposure opportunities.',
    keywords: 'advertise, advertising solutions, diverse audience, precision marketing, showcase offerings, accurate insights, exposure opportunities'
  }
  

export default function Advertise() {
return (
<>
<Navbar/>

<div style={{
display:'grid',
placeItems:'center',
}}>

<div style={{
width:'35%',
marginBottom:'1rem'
}}>
<h3 style={{

textTransform:'capitalize',
letterSpacing:'1px',
textAlign: 'center',
}}>sponsored work</h3>
</div>

<div className='adbox'>
<Image src={adimg} alt='...'/>
</div>

<div style={{
borderBottom:'solid  1px',
width:'35%'
}}>
<h3 style={{

textTransform:'capitalize',
letterSpacing:'1px',
textAlign: 'center',
}}>subscribe now</h3>
</div>
 
<p 
style={{

}}>$7 per month</p>
<p 
style={{
lineHeight:'1.5',
textAlign:'center',
fontSize:'15px',

}}
>Get your work to the front of the page. <br/>
Itruth News will feature your work on the front page of our <br/>
website for a fee.
</p>

<div style={{
display:'grid',
placeContent:'center'}}>

<div className='formbox'>
<label  htmlFor='fname'>Firstname</label>
<input  type='text'  id='fname'/>

<label  htmlFor='lname'>Lastname</label>
<input type='text'  id='lname'/>




<div className="payment-title">
<p style={{fontSize:'20px',fontWeight:'600'}}>Payment Method</p>
<p >🔒Secure Transaction</p>
</div>
<fieldset className='form-radio-group' >

<label className='form-radio-box'  htmlFor='1'>
<input type='radio'
style={{
display:'flex',
margin:'auto',
width:'24px',
backgroundColor:'transparent',
border:'solid 1px currentcolor',
cursor:'pointer',}}
name='age'
id='1'/>

<div className='payment-method-box'>
<div>Credit/Debit Card</div>
<svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-new-credit-card" preserveAspectRatio="xMinYMid" title="Credit card symbol" aria-hidden="true" focusable="false"><path fillRule="evenodd" clipRule="evenodd" d="M25.28 4.75L23.5066 3H5.77333L4 4.75V6.36H25.28V4.75ZM25.28 8.32H4L4 15.25L5.74377 17H23.5066L25.28 15.25L25.28 8.32ZM8.48 13.64H10.6958V12.52H8.48V13.64ZM14.0639 13.64H11.8481V12.52H14.0639V13.64ZM15.2161 13.64H17.4319V12.52H15.2161V13.64ZM20.8 13.64H18.5842V12.52H20.8V13.64Z" fill="#052962"></path>
</svg>
</div>
</label>

<label className='form-radio-box'  htmlFor='2'>
<input type='radio'
style={{
display:'flex',
margin:'auto',
width:'24px',
backgroundColor:'transparent',
border:'solid 1px currentcolor',
cursor:'pointer',}}
name='age'
id='2'/>

<div className='payment-method-box'>
<div >Paypal</div>
<svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-paypal" title="PayPal logo" aria-hidden="true" focusable="false">
<path d="M20.2203 6.06506C20.2055 6.15997 20.1885 6.257 20.1694 6.35668C19.5136 9.72401 17.2697 10.8873 14.404 10.8873H12.9449C12.5944 10.8873 12.2991 11.1418 12.2445 11.4875L11.4974 16.2254L11.2858 17.5684C11.2503 17.7953 11.4253 18 11.6543 18H14.2423C14.5487 18 14.8091 17.7773 14.8573 17.4751L14.8828 17.3436L15.37 14.2514L15.4013 14.0818C15.449 13.7785 15.7099 13.5558 16.0163 13.5558H16.4034C18.9107 13.5558 20.8735 12.5378 21.4472 9.59199C21.6869 8.36138 21.5628 7.33384 20.9287 6.61117C20.7368 6.39326 20.4987 6.21246 20.2203 6.06506Z" fill="#A7B4C8"></path>
<path d="M19.5339 5.79144C19.4337 5.76228 19.3303 5.73577 19.2243 5.71191C19.1177 5.68858 19.0085 5.6679 18.8961 5.64988C18.5027 5.58625 18.0716 5.55603 17.6098 5.55603H13.7117C13.6158 5.55603 13.5246 5.57777 13.4429 5.617C13.2632 5.70343 13.1296 5.87362 13.0972 6.08199L12.268 11.3342L12.2441 11.4874C12.2988 11.1417 12.5941 10.8872 12.9445 10.8872H14.4037C17.2694 10.8872 19.5133 9.72344 20.1691 6.35664C20.1887 6.25696 20.2052 6.15993 20.22 6.06503C20.0541 5.97701 19.8743 5.90172 19.6808 5.83757C19.6331 5.82166 19.5838 5.80629 19.5339 5.79144Z" fill="#041F4A"></path>
<path d="M13.0974 6.08205C13.1297 5.87368 13.2633 5.70348 13.4431 5.61759C13.5253 5.57836 13.6159 5.55662 13.7119 5.55662H17.61C18.0718 5.55662 18.5028 5.58684 18.8962 5.65046C19.0086 5.66849 19.1179 5.68917 19.2244 5.7125C19.3305 5.73636 19.4339 5.76287 19.5341 5.79203C19.5839 5.80687 19.6332 5.82225 19.6815 5.83763C19.875 5.90178 20.0547 5.9776 20.2207 6.06508C20.4158 4.82069 20.2191 3.97342 19.5463 3.20622C18.8045 2.3616 17.4657 2 15.7527 2H10.7793C10.4294 2 10.1309 2.2545 10.0768 2.60072L8.0053 15.7313C7.96447 15.9911 8.16489 16.2254 8.42681 16.2254H11.4972L12.2681 11.3343L13.0974 6.08205Z" fill="#052962"></path>
</svg>
</div>
</label>

</fieldset>
<button> $7 per month</button>
<p style={{
textAlign:'center',


}}>Cancel Anytime</p>
</div>
</div>
</div>
<Footer/>
</>
)
}
