'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { auth,db } from '@/app/Config/firebase';

export default function CommentForm() {
const [isSignedIn, setIsSignedIn] = useState(false);
const [content, setContent] = useState("");
const [comments, setComments] = useState([]);
const [successMessage, setSuccessMessage] = useState("");
const [names, setNames] = useState([]);
const [editComment, setEditComment] = useState(null);
const [autoFocus, setAutoFocus] = useState(false);
const router = useRouter();

 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsSignedIn(!!user);

      if (user) {
        try {
          // Fetch user data from Firestore
          const userData = await getUserData(user.uid);
          
          // Assuming userData contains a 'displayName' field
          setNames([userData.displayName]);
        } catch (error) {
          console.error(error.message);
        }
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);


  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the user is signed in
      if (!isSignedIn) {
        // Redirect to the login page if not signed in
        router.push('/pages/Login');
        return;
      }

      // Perform form submission logic, e.g., make API calls

      // If successful, display a success message
      setSuccessMessage('Form submitted successfully');
    } catch (error) {
      // Handle submission error, update error state
      console.error('Error during form submission:', error.message);
    }
  };
return (
<>
<form className="postform" onSubmit={handleSubmit}>
{isSignedIn ? (
<div className="commentreg-box">
{names.length > 0 && (
<span style={{ padding: '0 1rem' }} className="navinfo-block">
<span className="navinfo">{names.join(', ')}</span>
</span>)}
                        
<button
style={{
width: 'auto',
marginBottom: '4px',
}}
type="submit"
onClick={handleLogout}>
Log out
</button> 
</div>
) : (
<div className="commentreg-box">
<button
style={{
backgroundColor: 'blue',
width: 'auto',
margin: '10px',
}}
onClick={() => router.push('/pages/Login')}>
Login
</button>
<button
style={{
margin: '10px',
width: 'auto',
}}
onClick={() => router.push('/pages/Register')}>
Register
</button>
</div>
)}
{/* post form start here here */}
<textarea
rows="5"
cols="50"
required
value={content}
onChange={(e) => setContent(e.target.value)}
autoFocus={autoFocus}
></textarea>

<button 
className={isSignedIn ? "submitbtn" : "submitbtn disabled"} 
type="submit" 
disabled={!isSignedIn || !content} 
>
  Comment
</button>


{successMessage && <p className="error">{successMessage}</p>}
</form>
</>
)
}
