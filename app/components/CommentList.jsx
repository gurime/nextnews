'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, getDocs, getFirestore, doc, query, orderBy, where, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import EditCommentModal from './editCommentModel';

export default function CommentList(props) {
const [errorMessage, setErrorMessage] = useState('');
const [loading, setLoading] = useState(true);
const [editModalOpen, setEditModalOpen] = useState(false);
const [editingComment, setEditingComment] = useState(null);
const [successMessage, setSuccessMessage] = useState();
const { comments, setComments, articleId } = props;
const commentsRef = useRef(null);

const fetchComments = async (articleId) => {
try {
const db = getFirestore();
const commentsRef = collection(db, 'comments');
const queryRef = query(commentsRef, where('articleId', '==', articleId),   orderBy('timestamp', 'desc'));
const querySnapshot = await getDocs(queryRef);
const newComments = querySnapshot.docs.map((doc) => {
const commentData = doc.data();
return {id: doc.id,...commentData,timestamp: commentData.timestamp.toDate(),};});
setComments(newComments);
setLoading(false);
} catch (error) {
setErrorMessage('Error fetching comments. Please try again.');
setLoading(false);
}
};
// fetchcomments stops here

const userIsAuthenticated = async () => {
return new Promise((resolve) => {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
const isAuthenticated = !!user;
resolve(isAuthenticated);
});
});
};
// userIsAuthenticated stops here

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
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
} else {
setErrorMessage('Comment not found');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};
// EditPost stops here

const handleEditModalSave = async (postId, editedContent) => {
try {
await updateComment(postId, editedContent);
setEditModalOpen(false);
} catch (error) {
setErrorMessage('Error saving comment. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};
// handleEditModalSave stops here

const handleEditModalCancel = () => {
setEditModalOpen(false);
};
// handleEditModalCancel stops here

const updateComment = async (postId, editedContent) => {
try {
const db = getFirestore();
const commentRef = doc(db, 'comments', postId);
await updateDoc(commentRef, {
content: editedContent,
});
setComments((prevComments) =>
prevComments.map((comment) =>comment.id === postId ? { ...comment, content: editedContent } : comment
)
);
setSuccessMessage('Comment updated successfully');
setTimeout(() => {
setSuccessMessage('');
}, 3000);
} catch (error) {
setErrorMessage('Error updating comment. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};
// updateComment stops here

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
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
} else {
setErrorMessage('Unauthorized to delete this comment.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
}
} catch (error) {
setErrorMessage('Error deleting comment. Please try again.');
setTimeout(() => {
setErrorMessage('');
}, 3000);
}
};
// deletepost stops here

useEffect(() => {
setComments([]); // Reset comments to empty array
fetchComments(articleId);
}, [articleId]);

return (
<>
{editModalOpen && (<EditCommentModal comment={editingComment} onSave={handleEditModalSave} onCancel={handleEditModalCancel} />)}
{errorMessage && <p className="error">{errorMessage}</p>}
{successMessage && <p className="success">{successMessage}</p>}
<div ref={commentsRef} className="post-list">
{comments.map((comment, index) => (
<div key={`${comment.id}-${index}`} className="post-item">
<h2 className="postuser-username">{comment.userName}</h2>
<div className="bodyBlock">{comment.content}</div>
<div className="date-block">
<span className="momentDate">
{comment.timestamp instanceof Date? comment.timestamp.toLocaleString('en-US', {
year: 'numeric',
month: 'long',
day: 'numeric',
hour: 'numeric',
minute: '2-digit',
hour12: true  
})
: comment.timestamp
}

</span>
</div>
<div className="edit-delBlock">
<button className="edit-btn" onClick={() => editPost(comment.id, comment.userId)} type="button">
Edit
</button>
<button
className="delete-btn"
onClick={() => deletePost(comment.id, comment.userId)}
type="button"
>
Delete
</button>
</div>
</div>
))}
</div>

<div style={{ display: 'flex', placeContent: 'center' }}>
{loading && <BeatLoader color="blue" loading={loading} />}
</div>
</>
);
}
