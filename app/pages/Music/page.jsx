import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import HeadlineMusicArticle from './HeadlineMusicArticle'
import FeatureMusicArticle from './FeatureMusicArticle'

export const metadata = {
    title: 'iTruth News | Music',
    description: 'Immerse yourself in the world of music with iTruth News. Explore the latest music trends, artist spotlights, album reviews, and industry insights. Your go-to source for staying in tune with the dynamic and diverse landscape of the music industry.',
    keywords: 'music, music news, music trends, artist spotlights, album reviews, music industry insights'
  }
export default function Music() {
return (
<>
<Navbar/>
<FeatureMusicArticle/>
<HeadlineMusicArticle/>
<Footer/></>
)
}
