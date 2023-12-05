'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import navlogo from '../img/it.png'
import { useEffect, useState } from "react"
import Footer from "./Footer"
import { collectionRoutes, getArticle } from "./Navapi/api"

const Navbar = () => {
const router = useRouter()
const [isFooterVisible, setIsFooterVisible] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [isOverlayActive, setIsOverlayActive] = useState(false);
const [loading, setLoading] = useState(false);

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