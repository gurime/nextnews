'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  collection, deleteDoc, getDocs, getFirestore, doc, query, startAfter, orderBy, limit, where, getDoc } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useState, useEffect, useRef } from 'react'
import { FadeLoader } from 'react-spinners';

export default function CommentList(props) {
const [errorMessage, setErrorMessage] = useState('');
const [loading, setLoading] = useState(true);
const [pageNumber, setPageNumber] = useState(1); 
const [successMessage, setSuccessMessage ] = useState()
const commentsRef = useRef(null);
const { comments, setComments, articleId } = props;
const pageSize = 5; // Adjust this based on the number of comments to display per page

const fetchComments = async (page, size,articleId) => {
try {
const db = getFirestore();
const commentsRef = collection(db, 'comments');  
let queryRef = query(commentsRef, where('articleId', '==', articleId), orderBy('timestamp'), limit(size + 1));
if (page > 1) {
const lastVisibleComment = comments[comments.length - 1];
if (lastVisibleComment) {
const lastTimestamp = lastVisibleComment.timestamp;
queryRef = query(
commentsRef,
orderBy('timestamp'),
startAfter(lastTimestamp),
limit(size + 1)
);
}
}
  
const querySnapshot = await getDocs(queryRef);  
const newComments = [];
querySnapshot.forEach((doc) => {
const commentData = doc.data();
const formattedComment = {
id: doc.id,
...commentData,
timestamp: commentData.timestamp.toDate(), // Convert to JavaScript Date object
};
newComments.push(formattedComment);
}); 
// If there are more comments than the requested size, pop the last one
if (newComments.length > size) {
newComments.pop();
} 
// Append new comments to existing ones
setComments(newComments);
setLoading(false);
} catch (error) {
setErrorMessage('Error fetching comments. Please try again.');
setLoading(false);
}
};
  

const userIsAuthenticated = () => {
  const auth = getAuth();
  let isAuthenticated = false;

  onAuthStateChanged(auth, (user) => {
    isAuthenticated = !!user;
  });

  return isAuthenticated;
};

const deletePost = async (postId, commentUserId) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;


    // Check if the current user is authenticated and is the owner of the comment
    if (currentUser) {
    

      if (currentUser.uid === commentUserId) {

        const db = getFirestore();

        // Retrieve the comment document
        const commentDoc = await getDoc(doc(db, 'comments', postId));


        // Check if the comment exists
        if (commentDoc.exists()) {
          // If the conditions are met, proceed with deletion
          await deleteDoc(doc(db, 'comments', postId));

          // Assuming setComments is a function to update comments in the parent component
          setComments((prevComments) => prevComments.filter((comment) => comment.id !== postId));
          setSuccessMessage('Comment deleted successfully');
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        } else {
          setErrorMessage('Comment not found');
        }
      } else {
        // If the user is not the owner, handle accordingly
        setErrorMessage('Unauthorized to delete this comment.');
      }
    } 
  } catch (error) {
    console.error('Error deleting comment:', error);
    setErrorMessage('Error deleting comment. Please try again.');
  }
};



  
const handleNextPageClick = async () => {
try {
// Increment the page number
setPageNumber((prevPage) => prevPage + 1);  
// Scroll to the top of the comments after clicking the "Next Page" button
if (commentsRef.current) {
commentsRef.current.scrollIntoView({ behavior: 'auto' });
}
} catch (error) {
setErrorMessage('Error fetching next page of comments. Please try again.');
}
};
  
useEffect(() => {
setComments([]); // Reset comments to empty array
fetchComments(pageNumber, pageSize, articleId);
}, [pageNumber, pageSize, articleId]);


          
return (
<>
{errorMessage && <p className="error">{errorMessage}</p>}
<div ref={commentsRef} className="post-list">
{comments.slice(0, pageSize * pageNumber).map((comment,index) => (
<div key={`${comment.id}-${index}`} className="post-item">
<h2 className="postuser-username">{comment.userName}</h2>
<div className="bodyBlock">{comment.content}</div>
<div  className='date-block'>
<span className='momentDate'>
{comment.timestamp instanceof Date ? moment(comment.timestamp).format('MMMM Do YYYY, h:mma'): comment.timestamp}
</span>
</div>
<div className="edit-delBlock">
<button className="delete-btn" 
  onClick={() => deletePost(comment.id, comment.userId)}
  type="button">
Delete
</button>
</div>
</div>
))}
</div>
<div style={{display:'flex',placeContent:'center'}}>{loading && <FadeLoader color="green" loading={loading} size={50} />}</div>
<div className="pagination">
<button
onClick={() => setPageNumber((prevPage) => Math.max(prevPage - 1,1))}
disabled={pageNumber === 1 || loading}
className={pageNumber === 1 ? 'inactive' : 'active'}>
Previous Page
</button>
<span className='paginaation-page'>Page {pageNumber}</span>
<button onClick={handleNextPageClick} disabled={comments.length % pageSize !== 0 || loading}
className={pageNumber * pageSize >= comments.length ? 'inactive' : 'active'}>
Next Page 
</button>
</div>
</>
)
}
