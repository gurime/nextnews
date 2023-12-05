import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Image from 'next/image'
import React from 'react'
import contactimg from '../../img/contact-itruthnews.png'
import contactitruthimg from '../../img/contact-img.jpg'
import Link from 'next/link'

export const metadata = {
    title: 'iTruth News - Contact',
    description: 'Connect with iTruth News for seamless communication. Reach out effortlessly to our team, inquire about partnerships, or share your feedback. Your bridge to establishing a direct line with iTruth News, ensuring your queries are met with prompt and attentive responses.',
    keywords: 'contact, communication, partnerships, feedback, direct line, prompt responses, attentive support'
  }
  

export default function Contact() {
return (
<>
<Navbar/>
<div className='contact_title_img'>
<Link href='/'>
<Image height={34} src={contactimg}   alt='...'/>
</Link>
<p>
We appreciate you taking the time to get in touch with iTruth News.  If you'd want us to route your comment
to the appropriate itruth News section, please give the following information:
</p>
</div>
<div style={{
display:'grid',
placeContent:'center',
maxWidth: '30rem',
    margin: 'auto'
}}>
<div className='formbox'>
<label htmlFor='fname'>Firstname</label>
<input type='text'  id='fname'/>
<label htmlFor='lname'>Lastname</label>
<input type='text'  id='lname'/>
<select name="state" id="topic">
<option value="select a topic">Select a Topic</option>
<option value="general question">General Question</option>
<option value="opinion">Opinion</option>
<option value="contact editor">Contact Editor</option>
<option value="career opportunities">Career Opportunities</option>
<option value="about donations">About Donations</option>
<option value="advertising">About Advertising</option>
</select>
<textarea name="" id="" cols="30" rows="25"></textarea>
<button>Submit</button>
</div>
</div>
<div className='feedback-block'>
<Image className='conimg' style={{marginBottom:'1rem'}}  src={contactitruthimg} alt='...' />
</div>
<Footer/>
</>
)
}
