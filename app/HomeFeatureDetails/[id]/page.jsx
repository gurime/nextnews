import { db } from '@/app/Config/firebase'
import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import Goback from '@/app/components/goback'
import Goup from '@/app/components/goup'
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'


export async function generateMetadata({ params }) {

  const docRef = doc(db, 'Feature_Home_Article', params.id);
  
  try {
  const docSnap = await getDoc(docRef);
      
  if (docSnap.exists()) {
  const post = docSnap.data();
  
  return {
  title: `iTruth News | ${post?.title || 'Page Not Found'}`
  };
  } else {
  return {
  title: 'iTruth News | Page Not Found'
  };
  }
  } catch (error) {
  console.error('Error getting document:', error);
  return {
  title: 'iTruth News | Page Not Found'
  };
  }
  }
  
  
  async function getArticle(id) {
  
  const articleRef = doc(db, 'Feature_Home_Article', id);
  try {
  const docSnap = await getDoc(articleRef);
  if (docSnap.exists()) {
  return docSnap.data();
  } else {
        
  console.error('Document not found');
  return null;
  }
  } catch (error) {
  console.error('Error getting document:', error);
  // Handle error as needed
  return null;
  }
  }

export default async function DetailsPage({params}) {
const post = await getArticle(params.id)

return (
<>
<Navbar />
<div className="article-container">
{/**block for goback btn and title */}
<div className="backbtn-box">
<h1>{post.title}</h1>
<Goback/>
</div>
{/**block for goback btn and title */}
{/**block for img */}
{post.cover_image ? (
  <div className="imgbox">
    <img src={post.cover_image} alt="..." />
  </div>
) : (
  <p>Error loading image</p>
)}
{/**block for img */}
{/**block for category and author */}
<div className="authflex">
<p>{post.catogory}</p>
<h3
style={{
display: 'flex',
placeItems: 'center',
fontWeight: '300',
}}
className="card-category">
{post.author}
{/**separator */}
<div
style={{
border: 'solid 1px',
height: '30px',
margin: '0 0 0 6px',
}}
></div>
{/**separator */}
<img
style={{ width: '60px', }}
className="authpic"
src={post.authpic}
alt="..."
/>
</h3>
</div>
{/**block for category and author */}
<div className="flexdate">{post.date}</div>
<div className="body-content">

<p>{post.content}</p>
<p>{post.content1}</p>
<p>{post.content2}</p>
<p>{post.content3}</p>
<p>{post.content4}</p>
<p>{post.content5}</p>
<p>{post.content6}</p>
<p>{post.content7}</p>
<p>{post.content8}</p>


</div>
{/* <CommentForm/> */}



<div
style={{
display: 'flex',
justifyContent: 'flex-end',
placeItems: 'center',
marginBottom: '1rem',
}}
>
<Goup/>
</div>
</div>
<Footer /></>
)
}
