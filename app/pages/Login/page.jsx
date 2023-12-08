'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import itcontrubte from '../../img/red_itruth_logo.png'
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import {  signInWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import {  doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { auth,db } from '@/app/Config/firebase';
export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorState, setErrorState] = useState(null);
const [isInputValid, setIsInputValid] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

const router = useRouter()  

const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      validateInputs();

      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Redirect user to home page after successful login

      router.push('/');
    } catch (error) {
      // Improve error handling, provide more specific messages
      setErrorState('Please check your Email or Password');
    } finally {
      setIsLoading(false);
    }
  };


const validateInputs = () => {
    if (email === '' || password === '') {
    setIsInputValid(false);
    } else {
    setIsInputValid(true);
    }
    };
return (
<>
<Navbar/>
<div className='contribute-box'>
<div className='contribute-leftbox' style={{ marginBottom: '10rem' }}>
<Image src={itcontrubte} alt='...' priority />

<form style={{width:'35rem'}} className='formbox' onSubmit={handleLogin}>
<label htmlFor='email'>Email</label>
<input
type='email'
id='email'
value={email}
onChange={(e) => {
setEmail(e.target.value);
validateInputs();}}
/>

<label htmlFor='password'>Password</label>
<input
type='password'
id='password'
value={password}
onChange={(e) => {
setPassword(e.target.value);
validateInputs();}}
/>
<div
className='payment-title'
style={{
display: 'flex',
justifyContent: 'center'}}>
<p>
<Link href='/pages/Register'>Need An Account</Link>
</p>
</div>
<div className='error'>{errorState && <p>{errorState}</p>}</div>
<button type='submit' disabled={!isInputValid}> 
Login
</button>
</form>
</div>

<div className='contribute-rightbox'>
<h1>
{' '}
Support iTruthNews <br /> in the fight for <br /> honest news{' '}
</h1>
<p
style={{
lineHeight: '1.8',
fontSize: '15px',
borderTop: 'solid 1px gray'}}>
{' '}
It's never been more critical to have high-quality, independent news
that is inviting to everyone. <br />
To keep reporting in 2030, we'll need $1.05 million in funding.<br />
Please consider donating to support iTruthNews.
</p>
</div>
</div>
<Footer/>
</>
)
}
