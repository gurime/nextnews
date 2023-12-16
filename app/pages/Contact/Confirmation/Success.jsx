'use client'
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Success() {
    const router = useRouter()

  return (
    <> 
    <Navbar/>
    <div className= 'success-container'>
        <div className='success-header'><h1>Thank You</h1></div>
      <p className ='success-message'>
        Your message has been successfully sent to iTruth News.
      </p>

    </div>
    <Footer/>
    </>
   
  );
}
