'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  collection, deleteDoc, getDocs, getFirestore, doc, query, where } from 'firebase/firestore';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

export default function CommentList(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading state to true
    const { handleEdit } = props;
const router = useRouter()
useEffect(() => {
  const auth = getAuth();
  const db = getFirestore();

  // Check user authentication status on page load
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);

      // Assuming you have a user property in the comments collection
      const commentsCollection = collection(db, 'comments');
      // Temporarily remove filtering
      const userCommentsQuery = collection(db, 'comments');

      getDocs(userCommentsQuery)
        .then((querySnapshot) => {
          const userComments = [];
          querySnapshot.forEach((doc) => {
            userComments.push({ id: doc.id, ...doc.data() });
            console.log("Document Data:", doc.data()); // Log individual document data

          });

          console.log("Query Snapshot:", querySnapshot); // Log the entire querySnapshot
          console.log("User comments:", userComments);
          console.log("Final User Comments:", userComments);

          setComments(userComments);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error getting comments: ", error);
          setLoading(false);
        });
    } else {
      // Redirect to the login page if not signed in
      router.push('/pages/Login');
    }
  });

  return () => unsubscribe(); // Cleanup the subscription when the component unmounts
}, [router]);




  
  

    const deletePost = async (postId) => {
        try {
          // Update local state optimistically
          const updatedComments = comments.filter((comment) => comment._id !== postId);
          setComments(updatedComments);
      
          setLoading(true);
      
          // Access Firestore
          const db = getFirestore();
      
          // Example: Deleting a document from the 'comments' collection
          const commentsCollection = collection(db, 'comments');
          const commentDoc = doc(commentsCollection, postId); // Assuming postId is the document ID
          await deleteDoc(commentDoc);
      
          setLoading(false);
          setErrorMessage("Post successfully deleted.");
          setTimeout(() => { setErrorMessage(""); }, 3000);
        } catch (error) {
          console.error(error);
          setLoading(false);
      
          // Revert local state in case of an error
          setComments(comments);
      
          setErrorMessage(`<span class="error-message">${error.message || "Failed to delete post"}</span>`);
        }
      };
      
          
return (
<>
{errorMessage && <p className="error">{errorMessage}</p>}
<div className='post-list'>
{loading ? (
<p>Loading...</p>
) : (
<>
{users.map((user, index) => (
  <div className='postBlock' key={index}>
    <ul>
    {comments.map((comment, index) => (
  <div key={index} className='post-item'>
    <h2 className='postuser-username'>{comment.userName}</h2>
    <div className='bodyBlock'>{comment.content}</div>
    <div className='date-block'>
      <p>{moment(comment.timestamp.toDate()).format('hh:mm:ssA MM/DD/YYYY')}</p>
    </div>
    <div className='edit-delBlock'>
      <button className='edit-btn' onClick={(event) => handleEdit(event, comment)}>Edit</button>
      <button className='delete-btn' onClick={() => deletePost(comment.id)} type='button'>Delete</button>
    </div>
  </div>
))}
    </ul>
  </div>
))}

</>
)}
</div>
</>
)
}
