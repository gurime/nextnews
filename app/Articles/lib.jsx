import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/Config/firebase';

export async function getArticle(id) {
    const collectionRefs = [
      doc(db, 'article', id),
      doc(db, 'Feature_Home_Article', id),
      doc(db, 'HomeOpinionArticle', id),
      doc(db, 'FeatureBusinessArticle', id),
      doc(db, 'HeadlineBusinessArticle', id),
      doc(db, 'FeatureAfricaArticle', id)
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
      // Log additional information or handle error as needed
      return null;
    }
  }