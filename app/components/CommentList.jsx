'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  collection, deleteDoc, getDocs, getFirestore, doc, query, where, onSnapshot } from 'firebase/firestore';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

export default function CommentList(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true); 
    const { handleEdit, comments, setComments } = props;
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
      const userCommentsQuery = query(commentsCollection, where("userId", "==", user.uid));

      const fetchData = async () => {
        try {
          setLoading(true);

          const querySnapshot = await getDocs(userCommentsQuery);
          const userComments = [];

          querySnapshot.forEach((doc) => {
            userComments.push({ id: doc.id, ...doc.data() });
          });

          setComments(userComments);
        } catch (error) {
          console.error("Error getting comments: ", error);
          setErrorMessage(`Error getting comments: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };

      fetchData(); 

      const unsubscribeRealtime = onSnapshot(userCommentsQuery, (snapshot) => {
        const userComments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setComments(() => userComments); // Use setComments as a function
        setLoading(false);

      });

      return () => {
        unsubscribeRealtime(); 
        unsubscribe();
      };
    } else {
      // Redirect to the login page if not signed in
      // router.push('/pages/Login');
    }
  }, [router]); // Add router to the dependency array
})



  
  

const deletePost = async (postId) => {
  try {
    // Update local state optimistically
    const updatedComments = comments.filter((comment) => comment.id !== postId);
    setComments(updatedComments);

    setLoading(true);

    // Access Firestore
    const db = getFirestore();

    // Example: Deleting a document from the 'comments' collection
    const commentsCollection = collection(db, 'comments');
    const commentDoc = doc(commentsCollection, postId); // Assuming postId is the document ID
    await deleteDoc(commentDoc);

    setLoading(false);
    setErrorMessage("Comment successfully deleted."); // Update success message
    setTimeout(() => { setErrorMessage(""); }, 3000);
  } catch (error) {
    console.error(error);
    setLoading(false);

    // Revert local state in case of an error
    setComments(comments);

    // Update error message with clearer wording
    setErrorMessage(`Error deleting comment: ${error.message || "Failed to delete comment"}`);
  }
};

      
          
return (
<>
{errorMessage && <p className="error">{errorMessage}</p>}
<div className='post-list'>

<>
{comments.map((comment, index) => (
  <div key={comment.id} className='post-item'>
    <h2 className='postuser-username'>{comment.userName}</h2>
    <div className='bodyBlock'>{comment.content}</div>
    <div className='date-block'>
    {comment.timestamp &&
 comment.timestamp.toDate &&
 moment(comment.timestamp.toDate()).isValid() ? (
   <p>
     {moment(comment.timestamp.toDate()).format('hh:mm:ssA MM/DD/YYYY')}
   </p>
 ) : (
   <p>No valid timestamp available</p>
 )}
    </div>
    <div className='edit-delBlock'>
      {/* <button className='edit-btn' onClick={(event) => handleEdit(event, comment)}>Edit</button> */}
      <button className='delete-btn' onClick={() => deletePost(comment.id)} type='button'>Delete</button>
    </div>
  </div>
))}


</>

</div>


</>
)
}
