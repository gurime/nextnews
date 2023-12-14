'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  collection, deleteDoc, getDocs, getFirestore, doc, query, startAfter, orderBy, limit, where, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment/moment';
import React, { useState, useEffect, useRef } from 'react'
import { BeatLoader} from 'react-spinners';
import EditCommentModal from './editCommentModel';

export default function CommentList(props) {
const [errorMessage, setErrorMessage] = useState('');
const [loading, setLoading] = useState(true);
const [pageNumber, setPageNumber] = useState(1); 
const [editModalOpen, setEditModalOpen] = useState(false);
const [editingComment, setEditingComment] = useState(null);
const [successMessage, setSuccessMessage ] = useState()
const { comments, setComments, articleId } = props;
const commentsRef = useRef(null);
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
  

const userIsAuthenticated = async () => {
return new Promise((resolve) => {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
const isAuthenticated = !!user;
resolve(isAuthenticated);
});
});
};

const editPost = (postId, userId) => {
const commentToEdit = comments.find((comment) => comment.id === postId);
if (commentToEdit) {
const auth = getAuth();
const currentUser = auth.currentUser;
if (currentUser && currentUser.uid === commentToEdit.userId) {
setEditingComment(commentToEdit);
setEditModalOpen(true);
} else {
setErrorMessage('Unauthorized to edit this comment.');
}
} else {
setErrorMessage('Comment not found');
}
};


const handleEditModalSave = async (postId, editedContent) => {
try {
await updateComment(postId, editedContent);
setEditModalOpen(false);
} catch (error) {
}
};


const handleEditModalCancel = () => {
setEditModalOpen(false);
};

const updateComment = async (postId, editedContent,commentUserId) => {
try {
const db = getFirestore();
const commentRef = doc(db, 'comments', postId);
await updateDoc(commentRef, {
content: editedContent,
});
setComments((prevComments) =>
prevComments.map((comment) =>
comment.id === postId ? { ...comment, content: editedContent } : comment
)
);
setSuccessMessage('Comment updated successfully');
setTimeout(() => {
setSuccessMessage('');
}, 3000);
} catch (error) {
setErrorMessage('Error updating comment. Please try again.');
}
};


const deletePost = async (postId, commentUserId) => {
try {
const auth = getAuth();
const currentUser = auth.currentUser;
const isAuthenticated = await userIsAuthenticated();
if (currentUser) {
if (currentUser.uid === commentUserId) {
const db = getFirestore();
const commentDoc = await getDoc(doc(db, 'comments', postId));
if (commentDoc.exists()) {
await deleteDoc(doc(db, 'comments', postId));
setComments((prevComments) => prevComments.filter((comment) => comment.id !== postId));
setSuccessMessage('Comment deleted successfully');
setTimeout(() => {
setSuccessMessage('');
}, 3000);
} else {
setErrorMessage('Comment not found');
}
} else {
setErrorMessage('Unauthorized to delete this comment.');
}
} 
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
fetchComments(pageNumber, pageSize, articleId);
}, [pageNumber, pageSize, articleId]);


          
return (
<>
{editModalOpen && (
<EditCommentModal
comment={editingComment}
onSave={handleEditModalSave}
onCancel={handleEditModalCancel}/>
)}

{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="error">{successMessage}</p>}
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
<button
              className="edit-btn"
              onClick={() => editPost(comment.id, comment.userId)}
              type="button"
            >
              Edit
            </button>
<button className="delete-btn" 
  onClick={() => deletePost(comment.id, comment.userId)}
  type="button">
Delete
</button>
</div>
</div>
))}
</div>
<div style={{display:'flex',placeContent:'center'}}>{loading && <BeatLoader color="blue" loading={loading}  />}</div>
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
