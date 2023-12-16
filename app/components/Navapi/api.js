import { db } from "@/app/Config/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export async function getArticle(searchTerm) {
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
throw error;
}
}

export const collectionRoutes = {
article: '/Articles',
Feature_Home_Article: '/Articles',
HomeOpinionArticle: '/Articles',
//home page stops here//
    
FeatureTechArticle: '/Articles',
FeatureMusicArticle: '/Articles',
FeatureEducationArticle:'/Articles',
FeaturePoliticsArticle:'/Articles',
FeatureOpinionArticle:'/Articles',
FeatureSportsArticle:'/Articles',
FeatureFashionArticle:'/Articles',
FeatureEntertainmentArticle:'/Articles',
FeatureBusinessArticle:'/Articles',
FeatureImmigrationArticle:'/Articles',
FeatureVideoGamesArticle:'/Articles',
FeatureEconomyArticle:'/Articles',
FeatureCrimeArticle:'/Articles',
FeatureMilitaryArticle:'/Articles',
FeatureAfricaArticle:'/Articles',
//Feature Articles stops here
    
    
HeadlineTechArticle: '/Articles',
HeadlineMusicArticle: '/Articles',
HeadlineEducationArticle: '/Articles',
HeadlinePoliticsArticle: '/Articles',
HeadlineOpinionArticle: '/Articles',
HeadlineSportsArticle: '/Articles',
HeadlineFashionArticle:'/Articles',
HeadlineEntertainmentArticle:'/Articles',
HeadlineBusinessArticle:'/Articles',
HeadlineImmigrationArticle:'/Articles',
HeadlineVideoGamesArticle:'/Articles',
HeadlineEconomyArticle:'/Articles',
HeadlineCrimeArticle:'/Articles',
HeadlineMilitaryArticle:'/Articles',
HeadlineAfricaArticle:'/Articles'
//Headline Articles stops here
};
    