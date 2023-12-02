'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { db } from '../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function getArticles() {
const querySnapshot = await getDocs(collection(db , "article"));
const data = [];

querySnapshot.forEach((doc) => {
data.push({ id: doc.id, ...doc.data() });
});

return data;
}


export default function ArtilceList() {
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
<h1 style={{
color: 'grey',
borderBottom: '1px solid grey',
lineHeight: '2',
textTransform: 'capitalize',
padding: '0 1rem'
}}>headline news</h1>



<div className='card-grid'>
{loading && <h1 className='loading'>Loading...</h1>}
{fetchError && <p>{fetchError}</p>}
{!loading && !fetchError && useArticle.map((blog) => (
<div className="card" key={blog.id}>
<img src={blog.cover_image} alt="" />
<div className="authflex">
<p>{blog.catogory}</p>
<div className="authpic-block">
<h3 className="card-catogory">{blog.author}</h3>
<img
style={{ width: '30px', height: '30px' }}
className="authpic"
src={blog.authpic}
alt=""
/>
</div>
</div>
<h2 className="card-title">{blog.title}</h2>
<p className="card-content">
{blog.excerpt && blog.excerpt.slice(0, 100)}...
</p>
<div
style={{
display: 'flex',
placeItems: 'center',
justifyContent: 'space-between',

}}>
<Link href={`/Articles/${blog.id}`}className="slugbtn btn">
<button className="card-button" rel="noreferrer">
Read More
</button>
</Link>
{blog.date}
</div>
</div>
))}
</div>
</>
)
}
