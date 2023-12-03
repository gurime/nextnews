'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import navlogo from '../img/it.png'
import { useEffect, useState } from "react"
import Footer from "./Footer"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../Config/firebase"

// Fetch articles based on a search term from specified collections
async function getArticle(searchTerm) {
try {
// Specify the collections to search in
const collectionNames = ['article', 'Feature_Home_Article','HomeOpinionArticle',
'FeatureTechArticle','HeadlineTechArticle','FeatureMusicArticle', 'HeadlineMusicArticle'
];

// Fetch documents from each collection in parallel
const querySnapshots = await Promise.all(
collectionNames.map(collectionName =>
getDocs(query(collection(db, collectionName)))
)
);

// Process the query snapshots and filter articles based on the search term
const data = [];

querySnapshots.forEach((querySnapshot, index) => {
querySnapshot.forEach(doc => {
const docData = doc.data();

// Check if the article title includes the search term
if (
docData.title &&
docData.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
) {
// Add the article data to the result
data.push({ collection: collectionNames[index], id: doc.id, ...docData });
}
});
});

// Return the filtered articles
return data;
} catch (error) {
// Handle errors by logging and re-throwing
console.error('Error in getArticle:', error);
throw error;
}
}





const Navbar = () => {
const router = useRouter()
const [isFooterVisible, setIsFooterVisible] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [loading, setLoading] = useState(false);
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


const collectionRoutes = {
article: '/Articles',
Feature_Home_Article: '/HomeFeatureDetails',
HomeOpinionArticle: '/HomeOpinionDetails',
FeatureTechArticle: '/Technology/FeatureTechDetails',
HeadlineTechArticle: '/Technology/HeadlineTechDetails',
FeatureMusicArticle: '/Music/FeatureMusicDetails',
HeadlineMusicArticle: '/Music/HeadlineMusicDetails'
};

const getLink = (collection, id) => {
const route = collectionRoutes[collection];
return route ? `${route}/${id}` : '/';
};




return (
<>
<div className="nav">
<Image placeholder="blur" onClick={() => router.push('/')} src={navlogo} height={36} alt='...' />
<form style={{ width: '100%' }} onSubmit={handleSearch}>
<input
placeholder="Search iTruth News"
type="search"
spellCheck="false"
dir="auto"
tabIndex={0}
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>


{searchResults.length > 0 && searchTerm && !loading && (
<div className="search-results-container">
{searchResults.slice(0,5).map((result) => (
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
<Link href="../pages/Technology">Technology</Link>
<Link href="../pages/Music">Music</Link>
<Link href="../pages/Politics">Politics</Link>
<Link href="../pages/Opinion">Opinion</Link>
<Link href="../pages/Sports">Sports</Link>
<Link href='#!' onClick={toggleFooter}>More:</Link>
<button onClick={() => router.push('../pages/Contribute')} id="subbtn1">Contribute</button>
</div>

</div>
{/* end of navbar */}


{/* footer dropdown */}
{isFooterVisible && <Footer />}

</>
)
}

export default Navbar