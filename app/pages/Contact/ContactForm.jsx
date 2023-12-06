'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import contactimg from '../../img/contact-itruthnews.png';
import axios from 'axios';




export default function ContactForm() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    
      const onBlur = (e) => {
        // You can perform additional validation or actions on blur if needed
      };
    
      const onSubmit = async () => {
        // You can add your form submission logic here
        // Example: Sending data to a server using axios
      
        setIsLoading(true);
      
        try {
          // Replace the following with your actual form submission logic
          // For example, sending a POST request to a server using axios
          const response = await axios.post('your_submission_endpoint', values, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            setSuccessMessage('Form submitted successfully!');
          } else {
            setError('Form submission failed. Please try again.');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          setError('An unexpected error occurred. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <>
         <div className='contact_title_img'>
        <Link href='/'>
          <Image height={34} src={contactimg} alt='...' />
        </Link>
</div>
        <div style={{ display: 'grid', placeContent: 'center', maxWidth: '30rem', margin: 'auto' }}>
      <form className='formbox'>
        <label htmlFor='fname'>Name</label>
        <input
          type="text"
          name="name"
          id='fname'
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />

        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type="email"
          name="email" 
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />

        <label htmlFor='subject'>Subject</label>
        <input
          id='subject'
          type="text"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />

        <label>Type Your Message</label>
        <textarea
          type="text"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />

        <button disabled={isLoading || !values.name || !values.email || !values.subject || !values.message} onClick={onSubmit}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {successMessage && (
          <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>)}
      </form>
    </div>

    </>
  );
}
