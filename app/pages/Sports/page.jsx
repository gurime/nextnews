import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import HeadlineSportsArticle from './HeadlineSportsArticle'
import FeatureSportsArticle from './FeatureSportsArticle'


export const metadata = {
    title: 'iTruth News | Sports',
    description: 'Immerse yourself in the dynamic world of sports with iTruth News. Get the latest updates, scores, and analyses. Your go-to source for staying ahead in the game with comprehensive coverage on sports news, athlete profiles, and in-depth insights.',
    keywords: 'sports, sports news, latest updates, scores, sports analyses, athlete profiles, in-depth insights, sports coverage'
  }

export default function page() {
return (
<>
<Navbar/>
<FeatureSportsArticle/>
<HeadlineSportsArticle/>
<Footer/>
</>
)
}
