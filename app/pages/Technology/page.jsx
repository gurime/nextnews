import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import FeatureTechArticle from './FeatureTechArticle'
import HeadlineTechArticle from './HeadlineTechArticle'

export const metadata = {
    title: 'iTruth News | Technology',
    description: 'Stay at the forefront of technological advancements with iTruth News. Explore the latest insights, innovations, and trends in the tech world. Your go-to source for in-depth analyses, reviews, and updates on cutting-edge technology.',
    keywords: 'technology, tech news, technological advancements, innovation, tech trends, in-depth analyses, tech reviews, cutting-edge technology'
  }
  

export default function Technology() {

return (
<>
<Navbar/>
<FeatureTechArticle/>
<HeadlineTechArticle/>
<Footer/>
</>
)
}