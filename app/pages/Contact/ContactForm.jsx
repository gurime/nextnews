'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import contactimg from '../../img/contact-itruthnews.png';
import { BeatLoader } from 'react-spinners';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/Config/firebase';



export default function ContactForm() {
const [isLoading, setIsLoading] = useState(false);
const [isSignedIn, setIsSignedIn] = useState(false);

const [user, setUser] = useState('');
const [error, setError] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [fname, setFname] = useState();
const [subject, setSubject] = useState();
const [email, setEmail] = useState();
const [content, setContent] = useState();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
 

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      // Do something with userData if needed
    } else {
      // Handle the case when the document doesn't exist
    }

    setSuccessMessage('Form submitted successfully');
  } catch (error) {
    // Handle submission error, update error state
    setError('An error occurred during form submission');
  } finally {
    setIsLoading(false);
  }
};

      
    
const handleChange = (e) => {
  const { name, value } = e.target;
  setContent((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));

  // Additional handling for specific fields (subject, message, email)
  if (name === 'subject') {
    // Additional logic for handling the 'subject' field
  } else if (name === 'message') {
    // Additional logic for handling the 'message' field
  } else if (name === 'email') {
    // Additional logic for handling the 'email' field
  }
};

    
const onBlur = (e) => {
  const { name, value } = e.target;

  // Example: Perform validation based on the field name
  switch (name) {
    case 'name':
      // Example: Validate that the name is not empty
      if (!value.trim()) {
        setError('Name is required');
      } else {
        setError('');
      }
      break;

    case 'email':
      // Example: Validate email format
      const isValidEmail = validateEmail(value);
      if (!isValidEmail) {
        setError('Invalid email format');
      } else {
        setError('');
      }
      break;

    case 'subject':
      // Example: Validate that the subject is not empty
      if (!value.trim()) {
        setError('Subject is required');
      } else {
        setError('');
      }
      break;

    case 'message':
      // Example: Validate that the message is not empty
      if (!value.trim()) {
        setError('Message is required');
      } else {
        setError('');
      }
      break;

    // Add more cases for other fields as needed

    default:
      // Handle other fields if necessary
  }
};
// Example validation function for email
const validateEmail = (email) => {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
};
return (
<>
<div className='contact_title_img'>
<Link href='/'>
<Image title='Home Page' height={34} src={contactimg} alt='...' />
</Link>
</div>
<div style={{ display: 'grid', placeContent: 'center', maxWidth:'30rem', margin: 'auto' }}>
<form className='formbox' onSubmit={handleSubmit}>
  <label htmlFor='fname' aria-label="Name">Name</label>
  <input
    type="text"
    name="name"
    id='fname'
    value={fname}
    onChange={handleChange}
  />

  <label htmlFor='email' aria-label="Email">Email</label>
  <input
    id='email'
    type="email"
    name="email" 
    value={email}
    onChange={handleChange}
    onBlur={onBlur}
    aria-describedby="emailError"
  />

  <label htmlFor='subject' aria-label="Subject">Subject</label>
  <input
    id='subject'
    type="text"
    name="subject"
    value={subject}
    onChange={handleChange}
    onBlur={onBlur}
    aria-describedby="subjectError"
  />

  <label htmlFor='message' aria-label="Type Your Message">Type Your Message</label>
  <textarea
    type="text"
    id='message'
    name="message"
    rows={5}
    value={content}
    onChange={handleChange}
    onBlur={onBlur}
    aria-describedby="messageError"
  />

<button
  className={isSignedIn ? "submitbtn" : "submitbtn disabled"}
  type="submit"
  disabled={!isSignedIn || !content || isLoading}
>
  {isLoading ? <BeatLoader color='blue' /> : 'Comment'}
</button>

</form>

{error && <p id="emailError" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
{successMessage && (<p id="successMessage" style={{ color: "green", textAlign: "center" }}>{successMessage}</p>)}
</div>
</>
);
}
