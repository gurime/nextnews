import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/Config/firebase';

export async function getArticle(id) {
const collectionRefs = [
doc(db, 'article', id),
doc(db, 'Feature_Home_Article', id),
doc(db, 'HomeOpinionArticle', id),
doc(db, 'FeatureTechArticle', id),
doc(db, 'HeadlineTechArticle', id),
doc(db, 'FeatureMusicArticle', id),
doc(db, 'HeadlineMusicArticle', id),
doc(db, 'FeatureEducationArticle', id),
doc(db, 'HeadlineEducationArticle', id),
doc(db, 'FeaturePoliticsArticle', id),
doc(db, 'HeadlinePoliticsArticle', id),
doc(db, 'FeatureOpinionArticle', id),
doc(db, 'HeadlineOpinionArticle', id),
doc(db, 'FeatureSportsArticle', id),
doc(db, 'HeadlineSportsArticle', id),
doc(db, 'FeatureFashionArticle', id),
doc(db, 'HeadlineFashionArticle', id),
doc(db, 'FeatureEntertainmentArticle', id),
doc(db, 'HeadlineEntertainmentArticle', id),
doc(db, 'FeatureVideoGamesArticle', id),
doc(db, 'HeadlineVideoGamesArticle', id),
doc(db, 'FeatureBusinessArticle', id),
doc(db, 'HeadlineBusinessArticle', id),
doc(db, 'FeatureImmigrationArticle', id),
doc(db, 'HeadlineImmigrationArticle', id),
doc(db, 'FeatureEconomyArticle', id),
doc(db, 'HeadlineEconomyArticle', id),
doc(db, 'FeatureCrimeArticle', id),
doc(db, 'HeadlineCrimeArticle', id),
doc(db, 'FeatureMilitaryArticle', id),
doc(db, 'HeadlineMilitaryArticle', id),
doc(db, 'FeatureAfricaArticle', id),
doc(db, 'HeadlineAfricaArticle', id)
];
 
try {
for (const ref of collectionRefs) {
const snapshot = await getDoc(ref);

if (snapshot.exists()) {
return snapshot.data();
}
}
  
return null;
} catch (error) {
return null;
}
}