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
const collectionNames = ['article', 'Feature_Home_Article','HomeOpinionArticle', 'FeatureTechArticle','HeadlineTechArticle','FeatureMusicArticle','HeadlineMusicArticle','FeatureEducationArticle','HeadlineEducationArticle','FeaturePoliticsArticle', 'HeadlinePoliticsArticle', 'FeatureOpinionArticle','HeadlineOpinionArticle','FeatureSportsArticle','HeadlineSportsArticle','FeatureFashionArticle,','HeadlineFashionArticle','FeatureEntertainmentArticle','HeadlineEntertainmentArticle','FeatureVideoGamesArticle','HeadlineVideoGamesArticle','FeatureBusinessArticle','HeadlineBusinessArticle','FeatureImmigrationArticle','HeadlineImmigrationArticle','FeatureEconomyArticle','HeadlineEconomyArticle','FeatureCrimeArticle','HeadlineCrimeArticle','FeatureMilitaryArticle','HeadlineMilitaryArticle','FeatureAfricaArticle','HeadlineAfricaArticle'
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
//home page stops here//

FeatureTechArticle: '/pages/Technology/FeatureTechDetails',
FeatureMusicArticle: '/pages/Music/FeatureMusicDetails',
FeatureEducationArticle:'/pages/Education/FeatureEducationDetails',
FeaturePoliticsArticle:'/pages/Politics/FeaturePoliticsDetails',
FeatureOpinionArticle:'/pages/Opinion/FeatureOpinionDetails',
FeatureSportsArticle:'/pages/Sports/FeatureSportsDetails',
FeatureFashionArticle:'/pages/Fashion/FeatureFashionDetails',
FeatureEntertainmentArticle:'/pages/Entertainment/FeatureEntertainmentDetails',
FeatureBuisnessArticle:'/pages/Business/FeatureBuisnessDetails',
FeatureImmigrationArticle:'/pages/Immigration/FeatureImmigrationDetails',
FeatureVideoGamesArticle:'/pages/VideoGames/FeatureVideoGamesDetails',
FeatureEconomyArticle:'/pages/Economy/FeatureEconomyDetails',
FeatureCrimeArticle:'/pages/Crime/FeatureCrimeDetails',
FeatureMilitaryArticle:'/pages/Military/FeatureMilitaryDetails',
FeatureAfricaArticle:'/pages/Africa/FeatureAfricaDetails',
//Feature Articles stops here


HeadlineTechArticle: '/pages/Technology/HeadlineTechDetails',
HeadlineMusicArticle: '/pages/Music/HeadlineMusicDetails',
HeadlineEducationArticle: '/pages/Education/HeadlineEducationDetails',
HeadlinePoliticsArticle: '/pages/Politics/HeadlinePoliticsDetails',
HeadlineOpinionArticle: '/pages/Opinion/HeadlineOpinionDetails',
HeadlineSportsArticle: '/pages/Sports/HeadlineSportsDetails',
HeadlineFashionArticle:'/pages/Fashion/HeadlineFashionDetails',
HeadlineEntertainmentArticle:'/pages/Entertainment/HeadlineEntertainmentDetails',
HeadlineBusinessArticle:'/pages/Business/HeadlineBusinessDetails',
HeadlineImmigraionArticle:'/pages/Immigration/HeadlineImmigrationDetails',
HeadlineVideoGamesArticle:'/pages/VideoGames/HeadlineVideoGamesDetails',
HeadlineEconomyArticle:'/pages/Economy/HeadlineEconomyDetails',
HeadlineCrimeArticle:'/pages/Crime/HeadlineCrimeDetails',
HeadlineMilitaryArticle:'/pages/Military/HeadlineMilitaryDetails',
HeadlineAfricaArticle:'/pages/Africa/HeadlineAfricaDetails'
//Headline Articles stops here
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
<Link href="/pages/Technology">Technology</Link>
<Link href="/pages/Music">Music</Link>
<Link href="/pages/Politics">Politics</Link>
<Link href="/pages/Opinion">Opinion</Link>
<Link href="/pages/Sports">Sports</Link>
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