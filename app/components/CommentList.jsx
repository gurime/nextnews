'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  collection, deleteDoc, getDocs, getFirestore, doc, query, where, onSnapshot } from 'firebase/firestore';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners';

export default function CommentList(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true); 
    const [currentUser, setCurrentUser] = useState(null);

    const { comments, setComments } = props;
    const router = useRouter()




  


          
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
     
<button className='delete-btn' onClick={() => deletePost(comment.id)} type='button'>
Delete
</button>
    
</div>
</div>
))}


</>

</div>


</>
)
}
