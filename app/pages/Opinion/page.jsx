import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import FeatureOpinionArticle from './FeatureOpinionArticle'
import HeadlineOpinionArticle from './HeadlineOpinionArticle'

export const metadata = {
    title: 'iTruth News - Opinion',
    description: 'Explore diverse opinions and thought-provoking perspectives on current affairs with iTruth News. Your source for insightful commentary, in-depth analyses, and a platform for a variety of opinions on topics shaping our world.',
    keywords: 'opinion, commentary, perspectives, thought-provoking, current affairs, diverse opinions, in-depth analyses'
  }

export default function Opinion() {
return (
<>
<Navbar/>
<FeatureOpinionArticle/>
<HeadlineOpinionArticle/>
<Footer/>
</>
)
}
