'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import { auth } from '@/app/Config/firebase';
import CommentList from './CommentList';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FadeLoader } from 'react-spinners';

export default function CommentForm({articleId}) {
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
throw error;
}
};
setIsSignedIn(!!user);
if (user) {
try {
const userData = await getUserData(user.uid);
setNames([userData.firstName, userData.lastName]);
} catch (error) {
handleError(error);
} finally {
setIsLoading(false)
}
}
});
return () => unsubscribe();
}, []);

const handleError = (error) => {
if (error.code === 'network-error') {
setErrorMessage('Network error: Please check your internet connection.');
} else if (error.code === 'invalid-content') {
setErrorMessage('Invalid comment content. Please try again.');
} else {
setErrorMessage('Unexpected error occurred. Please try again later.');
}
};



const handleSubmit = async (e) => {
e.preventDefault();
try {
const auth = getAuth();
const user = auth.currentUser;
setIsLoading(true);
const db = getFirestore();
const docRef = await addDoc(collection(db, 'comments'), {
articleId:articleId,
userId: user.uid,
content: content,
timestamp: new Date(),
userName: user.displayName,
userEmail: user.email,
});
setComments((prevComments) => [...prevComments,
{
id: docRef.id,
userId: user.uid,
content: content,
timestamp: new Date(),
userName: user.displayName,
userEmail: user.email,
},
]);
setSuccessMessage('Comment submitted successfully');
setTimeout(() => {
  setSuccessMessage('');
}, 3000);
setContent('');
} catch (error) {
setErrorMessage('Error submitting comment. Please try again.');
} finally {
setIsLoading(false);
}
};


const handleLogout = async () => {
try {
await auth.signOut();
} catch (error) {
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
autoFocus={autoFocus}></textarea>
<button
className={isSignedIn ? "submitbtn" : "submitbtn disabled"}
type="submit"
disabled={!isSignedIn || !content || isLoading}>
{isLoading ? <FadeLoader color='blue' /> : 'Comment'}
</button>



{successMessage && <p className="error">{successMessage}</p>}
</form>

<CommentList comments={comments} setComments={setComments} articleId={articleId}  />

</>
)
}
