'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { auth, db } from '../../Config/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import itcontrubte from '../../img/red_itruth_logo.png'
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
export default function Register() {
const [ firstName, setFirstName ] = useState('');
const [ lastName, setLastName ]  = useState('');
const [isLoading, setIsLoading] = useState(false);
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');
const [errorState, setErrorState] = useState(null);
const [isInputValid, setIsInputValid] = useState(false);
const router = useRouter();
const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password,firstName,lastName);
      const user = userCredential.user;

      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`
      });

      await sendEmailVerification(auth.currentUser);

      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        password
      });

      router.push('/');
    } catch (error) {
      // Improve error handling, provide more specific messages
      setErrorState('Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    setIsInputValid(email !== '' && password !== '');
  };
return (
<>
<Navbar/>
<div className='contribute-box' >
<div className='contribute-leftbox'>
<Image style={{cursor:'none'}}  src={itcontrubte} alt='...' />   

<form className='formbox'onSubmit={handleRegister}>
<label htmlFor='fname'>First Name</label>
<input type='text'  id='fname' value={firstName} onChange={(e) => setFirstName(e.target.value)} required  maxLength="50"/>

<label htmlFor='lname'>Last Name</label>
<input type='text'  id='lname' value={lastName} onChange={(e) => setLastName(e.target.value)} required maxLength="50"/>

<label htmlFor='email'>Email</label>
<input
  type='email'
  id='email'
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateInputs();
  }}
  required
  maxLength="254"
  title="Please enter a valid email address"
/>

<label htmlFor='password'>Password</label>
<input
  type='password'
  id='password'
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    validateInputs();
  }}
  required
 

  minLength="8"
  maxLength="100"
  title="Password must be between 8 and 100 characters long and include symbols and numbers"
/>

<div 
className="payment-title"
style={{
 display:'flex',
 justifyContent:'center'   
}}
>

<p><Link  href='/pages/Login'>Already Have An Account</Link></p>
</div>
<div className='error'>{errorState && <p>{errorState}</p>}</div>
<button type='submit' disabled={!isInputValid}> 
Sign Up
</button></form>
</div>  


<div className='contribute-rightbox'>
<h1> Support iTruthNews <br/> 
in the fight for   <br/> 
honest news </h1>
<p style={{lineHeight:'1.8',fontSize:'15px',borderTop:'solid 1px gray'}} >  It's never been more critical to have high-quality, independent news that is inviting to everyone. <br/>
To keep reporting in 2030, we'll need $1.05 million in funding.<br/> 
Please consider donating to support iTruthNews.
</p>

</div>
</div>
<Footer/>
</>
)
}
