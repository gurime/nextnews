'use client'
import {  collection, deleteDoc, getDocs, getFirestore, doc, query, startAfter, orderBy, limit } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useState, useEffect, useRef } from 'react'
import { FadeLoader } from 'react-spinners';

export default function CommentList(props) {
const [errorMessage, setErrorMessage] = useState('');
const [loading, setLoading] = useState(true);
const [pageNumber, setPageNumber] = useState(1); // New state for pagination
const commentsRef = useRef(null);
const { comments, setComments } = props;
const pageSize = 5; // Adjust this based on the number of comments to display per page

const fetchComments = async (page, size) => {
try {
const db = getFirestore();
const commentsRef = collection(db, 'comments');  
let queryRef = query(commentsRef, orderBy('timestamp'), limit(size + 1)); 
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
setComments((prevComments) => [...prevComments, ...newComments]);  
setLoading(false);
} catch (error) {
console.error('Error fetching comments:', error.message);
setErrorMessage('Error fetching comments. Please try again.');
setLoading(false);
}
};
  


const deletePost = async (postId) => {
try {
const db = getFirestore();
await deleteDoc(doc(db, 'comments', postId));
// Assuming setComments is a function to update comments in the parent component
setComments((prevComments) => prevComments.filter((comment) => comment.id !== postId));
} catch (error) {
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
fetchComments(pageNumber, pageSize);
}, [pageNumber]);

          
return (
  <>
{errorMessage && <p className="error">{errorMessage}</p>}
<div ref={commentsRef} className="post-list">
{comments.slice(0, pageSize * pageNumber).map((comment,index) => (
    <div key={`${comment.id}-${index}`} className="post-item">
    <h2 className="postuser-username">{comment.userName}</h2>
      <div className="bodyBlock">{comment.content}</div>
      <div className='date-block'>
      <span>
  {comment.timestamp instanceof Date
    ? moment(comment.timestamp).format('MMMM Do YYYY, h:mm:ss a')
    : comment.timestamp}
</span>

      </div>

      <div className="edit-delBlock">
        <button
          className="delete-btn"
          onClick={() => deletePost(comment.id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
))}
</div>
      {loading && <FadeLoader color="blue" loading={loading} size={50} />}
      <div className="pagination">
      <button
  onClick={() => setPageNumber((prevPage) => Math.max(prevPage - 1, 1))}
  disabled={pageNumber === 1 || loading}
  className={pageNumber === 1 ? 'inactive' : 'active'}
>
  Previous Page
</button>
<span>Page {pageNumber}</span>
<button
  onClick={handleNextPageClick}
  disabled={comments.length < pageSize || comments.length % pageSize !== 0 || loading}
  className={pageNumber * pageSize >= comments.length ? 'inactive' : 'active'}
>
  Next Page 
</button>
      </div>
</>
)
}
