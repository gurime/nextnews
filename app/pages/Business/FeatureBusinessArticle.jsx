'use client'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore' 
import Link from 'next/link'
import { db } from '@/app/Config/firebase'
import Loading from '@/app/components/Loading'


async function getArticles() {
  const querySnapshot = await getDocs(collection(db , "FeatureBusinessArticle"));
  const data = [];
  
  querySnapshot.forEach((doc) => {
  data.push({ id: doc.id, ...doc.data() });
  });
  
  return data;
  }


export default function FeatureBusinessArticle() {
const [fetchError, setFetchError] = useState(null);
const [loading, setLoading] = useState(true);
const [useArticle, setUseArticle] = useState([]);

useEffect(() => {
const fetchData = async () => {
try {
const data = await getArticles();
setUseArticle(data);
} catch (error) {
console.error('Error fetching articles:', error);
setFetchError('Error fetching articles. Please try again later.');
} finally {
setLoading(false); 
}
};
  
fetchData();
}, []);
  return (
<>
{loading ? (
<h1 className='loading'><Loading/></h1>
) : (
<div className="hero">
{fetchError ? (
<p>Error: {fetchError}</p>
) : (
useArticle.map((post) => (
<React.Fragment key={post.id}>
<div className="hero-info">
<h1 className="hero-title">{post.title}</h1>
<div className="authflex">
<p>{post.catogory}</p>
<div className="authpic-block">
<h3 className="card-catogory">{post.author}</h3>
<img
style={{ width: '40px', height: '40px' }}
className="authpic"
src={post.authpic}
alt=""/>
</div>
</div>
<p className="hero-description">
{post.excerpt && post.excerpt.slice(0, 200)}...
</p>
<div
style={{
display: 'flex',
placeItems: 'center',
justifyContent: 'space-between',
}}>
<Link href={`/Articles/${post.id}`}className="hero-btn">
Read More
</Link>
{post.date}
</div>
</div>
<div className="heroimg-box">
<img src={post.cover_image} alt="Hero Image" />
</div>
</React.Fragment>
))
)}
</div>
)}
</>
)
}
