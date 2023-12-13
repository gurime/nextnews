'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { auth } from '@/app/Config/firebase';
import CommentList from './CommentList';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FadeLoader } from 'react-spinners';

export default function CommentForm() {
const [isSignedIn, setIsSignedIn] = useState(false);
const [content, setContent] = useState("");
const [ isLoading, setIsLoading] = useState(false)
const [comments, setComments] = useState([]);
const [successMessage, setSuccessMessage] = useState("");
const [names, setNames] = useState([]);
const [autoFocus, setAutoFocus] = useState(true);
const [errorMessage, setErrorMessage] = useState('');

const router = useRouter();

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    const getUserData = async (userId) => {
      try {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          return userData;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        throw error;
      }
    };

    setIsSignedIn(!!user);

    if (user) {
      try {
        // Fetch user data from Firestore
        const userData = await getUserData(user.uid);
        setNames([userData.firstName, userData.lastName]);
      } catch (error) {
        console.error(error.message);
      }
    }
  });

  // Cleanup function
  return () => unsubscribe();
}, []);




const handleSubmit = async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  try {
    // Get the current user from authentication
    const auth = getAuth();
    const user = auth.currentUser;

    // Set loading state
    setIsLoading(true);

    // Get Firestore instance
    const db = getFirestore();

    // Add a new comment to the "comments" collection
    const docRef = await addDoc(collection(db, 'comments'), {
      userId: user.uid,
      content: content,
      timestamp: new Date(),
      userName: user.displayName,
      userEmail: user.email,
    });

    // Update local state with the new comment details
    setComments((prevComments) => [
      ...prevComments,
      {
        id: docRef.id,
        userId: user.uid,
        content: content,
        timestamp: new Date(),
        userName: user.displayName,
        userEmail: user.email,
      },
    ]);

    // Set a success message
    setSuccessMessage('Comment submitted successfully');

    // Reset content state
    setContent('');
  } catch (error) {
    // Handle errors and log them
    console.error('Error submitting comment:', error.message);

    // Set an error message for the user
    setError('Error submitting comment. Please try again.');
  } finally {
    // Reset loading state
    setIsLoading(false);
  }
};


const handleLogout = async () => {
try {
await auth.signOut();
} catch (error) {
console.error('Error during logout:', error.message);
}
};
return (
<>
<form className="postform" onSubmit={handleSubmit}>
{isSignedIn ? (
<div className="commentreg-box">
{names.length === 2 && (
<>
<div className='navinfo-box'><span className="navinfo">{names[0]}</span>
<span className="navinfo">{names[1]}</span></div>
</>
)}
<button
style={{
width: 'auto',
marginBottom: '4px',
}}
type="submit"
onClick={handleLogout}
>
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
placeholder='Type Your Message'
required
value={content}
onChange={(e) => setContent(e.target.value)}
autoFocus={autoFocus}  
></textarea>
<button
  className={isSignedIn ? "submitbtn" : "submitbtn disabled"}
  type="submit"
  disabled={!isSignedIn || !content || isLoading}
>
  {isLoading ? <FadeLoader color='blue' /> : 'Comment'}
</button>



{/* {successMessage && <p className="error">{successMessage}</p>} */}
</form>

<CommentList comments={comments} setComments={setComments}  />

</>
)
}
