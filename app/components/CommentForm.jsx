'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { auth,db } from '@/app/Config/firebase';
import CommentList from './CommentList';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function CommentForm() {
const [isSignedIn, setIsSignedIn] = useState(false);
const [content, setContent] = useState("");
const [originalCollection, setOriginalCollection] = useState("");

const [comments, setComments] = useState([]);
const [successMessage, setSuccessMessage] = useState("");
const [names, setNames] = useState([]);
const [editComment, setEditComment] = useState(null);
const [autoFocus, setAutoFocus] = useState(false);
const [user, setUser] = useState("");

const router = useRouter();

 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsSignedIn(!!user);

      if (user) {
        try {
          // Fetch user data from Firestore
          const userData = await getUserData(user.uid);
          
          // Assuming userData contains a 'displayName' field
          setNames([userData.firstName, userData.lastName]);
        } catch (error) {
          console.error(error.message);
        }
      }
    });

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
    const auth = getAuth();
    const user = auth.currentUser;

    const db = getFirestore();

    if (editComment) {
      // If editComment state is set, update the existing comment
      const commentRef = doc(
        db,
        'comments',
        editComment.collectionName,
        editComment.id
      );
      await setDoc(commentRef, {
        content: content,
        timestamp: new Date(),
      });

      // Update the local state with the edited comment
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editComment.id
            ? { ...comment, content: content, timestamp: new Date() }
            : comment
        )
      );

      // Clear editComment state after updating
      setEditComment(null);
      setSuccessMessage('Comment updated successfully');
    } else {
      // If editComment state is not set, add a new comment
      const docRef = await addDoc(
        collection(db, 'comments', originalCollection),
        {
          userId: user.uid,
          content: content,
          timestamp: new Date(),
          userName: user.displayName,
          userEmail: user.email,
          collectionName: originalCollection, // Include the collection name
        }
      );

      setComments((prevComments) => [
        ...prevComments,
        {
          id: docRef.id,
          userId: user.uid,
          content: content,
          timestamp: new Date(),
          userName: user.displayName,
          userEmail: user.email,
          collectionName: originalCollection,
        },
      ]);

      setSuccessMessage('Comment submitted successfully');
    }

    setContent(''); // Clear the content after submission
  } catch (error) {
    console.error('Error during form submission:', error.message);
  }
};


  const handleEdit = (event, comment) => {
    event.preventDefault();
    setContent(comment.content); 
    setEditComment(comment); 
    setAutoFocus(true);

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
disabled={!isSignedIn || !content} 
>
  Comment
</button>


{/* {successMessage && <p className="error">{successMessage}</p>} */}
</form>
<CommentList comments={comments} setComments={setComments} handleEdit={handleEdit} />

</>
)
}
