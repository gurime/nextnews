'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  collection, deleteDoc, getDocs, getFirestore, doc, query, startAfter, orderBy, limit } from 'firebase/firestore';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners';

export default function CommentList(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // New state for pagination
  const { comments, setComments } = props;
  const router = useRouter();

  const pageSize = 5; // Adjust this based on the number of comments to display per page

  const fetchComments = async (page, size) => {
    try {
      const db = getFirestore();
      const commentsRef = collection(db, 'comments');
  
      let queryRef = query(commentsRef, orderBy('timestamp'), limit(size));
  
      if (page > 1) {
        const lastVisibleComment = comments[comments.length - 1];
        if (lastVisibleComment) {
          const lastTimestamp = lastVisibleComment.timestamp;
          queryRef = query(commentsRef, orderBy('timestamp'), startAfter(lastTimestamp), limit(size));
        }
      }
  
      const querySnapshot = await getDocs(queryRef);
  
      const newComments = [];
      querySnapshot.forEach((doc) => {
        newComments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
  
      // Append new comments to existing ones
      setComments((prevComments) => [...prevComments, ...newComments]);
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      setErrorMessage('Error fetching comments. Please try again.');
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    setComments([]); // Reset comments to empty array
    fetchComments(pageNumber, pageSize);
  }, [pageNumber]);

  const deletePost = async (postId) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'comments', postId));
      // Assuming setComments is a function to update comments in the parent component
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== postId));
    } catch (error) {
      console.error('Error deleting comment:', error.message);
      setErrorMessage('Error deleting comment. Please try again.');
    }
  };


  


          
return (
  <>
{errorMessage && <p className="error">{errorMessage}</p>}
<div className="post-list">
{comments.slice(0, pageSize * pageNumber).map((comment,index) => (
    <div key={`${comment.id}-${index}`} className="post-item">
    <h2 className="postuser-username">{comment.userName}</h2>
      <div className="bodyBlock">{comment.content}</div>
      <div className='date-block'>
        {comment.timestamp && (
          <span>{moment(comment.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
        )}
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
{loading && <ClipLoader color="#36D7B7" loading={loading} size={50} />}
<div className="pagination">
<button
  onClick={() => setPageNumber((prevPage) => Math.max(prevPage - 1, 1))}
  disabled={pageNumber === 1}
>
  Previous Page
</button>
<span>Page {pageNumber}</span>
<button
  onClick={() => setPageNumber((prevPage) => prevPage + 1)}
  disabled={comments.length < pageSize}
>
  Next Page
</button>
</div>

</>
)
}
