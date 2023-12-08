'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { auth,db } from '@/app/Config/firebase';
import CommentList from './CommentList';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function CommentForm() {
const [isSignedIn, setIsSignedIn] = useState(false);
const [content, setContent] = useState("");
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
          setNames([userData.displayName]);
        } catch (error) {
          console.error(error.message);
        }
      }
    });

const getUserData = async (userId) => {
try {
// Access Firestore
const db = getFirestore();
    
// Example: Getting data from a 'users' collection based on user ID
const userDocRef = doc(db, 'users', userId);
const userDocSnapshot = await getDoc(userDocRef);
    
// Check if the document exists
if (userDocSnapshot.exists()) {
// Access user data
const userData = userDocSnapshot.data();
return userData;
} else {
// Handle the case where the user document does not exist
return null;
}
} catch (error) {
console.error('Error fetching user data:', error.message);
throw error; // Propagate the error for handling in the calling code
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

// Check if the user is signed in
if (!user) {
// Redirect to the login page if not signed in
router.push('/pages/Login');
return;
}

// Access Firestore
const db = getFirestore();
// Example: Creating a 'comments' collection and adding a document
const commentsCollection = collection(db, 'comments');
// Use the content of the comment as the form data
const formData = content;
// Add document to Firestore
const docRef = await addDoc(commentsCollection, {
  userId: user.uid,
  content: formData,
  timestamp: new Date(),
  userName: user.displayName,
  userEmail: user.email,
  // Add other user-related fields as needed
    });
    

    // If successful, display a success message or perform other actions
    setSuccessMessage('Comment submitted successfully');
    setContent(''); // Clear the content after submission
  } catch (error) {
    // Handle submission error, update error state
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
<span className="navinfo-block">
    <span className="navinfo">{user.firstName}</span>
  </span>
                        
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


{successMessage && <p className="error">{successMessage}</p>}
</form>
<CommentList  handleEdit={handleEdit}  />

</>
)
}
