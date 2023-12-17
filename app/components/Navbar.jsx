'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import navlogo from '../img/it.png'
import { useEffect, useState } from "react"
import Footer from "./Footer"
import { collectionRoutes, getArticle } from "./Navapi/api"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { auth,db } from '@/app/Config/firebase';

const Navbar = () => {
const router = useRouter()
const [isFooterVisible, setIsFooterVisible] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [isOverlayActive, setIsOverlayActive] = useState(false);
const [loading, setLoading] = useState(false);
const [isSignedIn, setIsSignedIn] = useState(false);
const [names, setNames] = useState([]);
const overlayStyle = {
position: 'fixed',
top: 0,
left: 0,
width:'100%',
height: '100%',
background: '#000',
opacity:'.6',
display: isOverlayActive ? 'block' : 'none',
pointerEvents: 'none',
};



useEffect(() => {
const unsubscribe = auth.onAuthStateChanged(async (user) => {
setIsSignedIn(!!user);

if (user) {
try {
// Fetch user data from Firestore
const userData = await getUserData(user.uid);          
setNames([userData.firstName, userData.lastName]);
} catch (error) {
console.error(error.message);
}
}
});

const handleDocumentClick = (e) => {
const isClickOutsideSearch = !e.target.closest('.search-container');

if (isClickOutsideSearch) {
// Click is outside the search, close the overlay and reset search results
setIsOverlayActive(false);
setSearchResults([]);
}
};

// Add event listener to the document body
document.body.addEventListener('click', handleDocumentClick);



const getUserData = async (userId) => {
try {
const db = getFirestore();
const userDocRef = doc(db, 'users', userId);
const userDocSnapshot = await getDoc(userDocRef);    
if (userDocSnapshot.exists()) {
const userData = userDocSnapshot.data();
return userData;
} else {
return null;
}
} catch (error) {
console.error('Error fetching user data:', error.message);
throw error;
}
};
return () => {
document.body.removeEventListener('click', handleDocumentClick);
unsubscribe(); // Assuming you have an unsubscribe function
};
}, [searchTerm, isOverlayActive]);

  

const handleSearch = async () => {
const results = await getArticle(searchTerm);
setSearchResults(results);
};

useEffect(() => {
handleSearch();
}, [searchTerm]);

const toggleFooter = () => {
setIsFooterVisible(!isFooterVisible);
};



const getLink = (collection, id) => {
const route = collectionRoutes[collection];
return route ? `${route}/${id}` : '/';
};




return (
<>
<div className="nav">
<Image placeholder="blur" onClick={() => router.push('/')} src={navlogo} height={36} alt='...' />
<div style={overlayStyle}></div>
<form style={{ width: '100%',position:'relative',  }} onSubmit={handleSearch}>
<input
placeholder="Search iTruth News"
type="search"
spellCheck="false"
dir="auto"
tabIndex={0}
value={searchTerm}
onChange={(e) => {
setSearchTerm(e.target.value);
setIsOverlayActive(e.target.value.trim().length > 0);
}}
/>


{searchResults.length > 0 && searchTerm && !loading && (
<div className="search-results-container">
{searchResults.slice(0,10).map((result) => (
<div key={result.id} className="search-result-item">
<Link key={result.id} href={getLink(result.collection, result.id)}>
<p>{result.title}</p>
</Link>
</div>
))}
</div>
)}
</form>

<div className="navlinks">


{isSignedIn ? (
<Link  href='#!'>
{names.length === 2 && (
<>
<span className="sm-name" >{names[0]}</span>
<span className="sm-name">{names[1]}</span>
</>
)}
</Link>
) : (

<span className="sm-name">
Guest

</span>
)}

<Link href="/">Home</Link>
<Link href="/pages/Technology">Technology</Link>
<Link href="/pages/Music">Music</Link>
<Link href="/pages/Politics">Politics</Link>
<Link href="/pages/Opinion">Opinion</Link>
<Link href="/pages/Sports">Sports</Link>
<Link href='#!' onClick={toggleFooter}>More:</Link>
<button onClick={() => router.push('/pages/Contribute')} id="subbtn1">Contribute</button>

</div>


</div>
{/* end of navbar */}


{/* footer dropdown */}
<div style={{position:'relative',width:'100%'}}>
<div style={{position:'absolute',width:'100%'}}>
{isFooterVisible && <Footer />}</div>
</div>


{/* footer dropdown */}
</>
)
}

export default Navbar