import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import HeadlineEntertainmentArticle from './HeadlineEntertainmentArticle'
import FeatureEntertainmentArticle from './FeatureEntertainmentArticle'



export const metadata = {
    title: 'iTruth News - Entertainment',
    description: 'Embark on a journey into the world of entertainment with iTruth News. Discover the latest in movies, music, and pop culture through insightful content. Your go-to source for staying in the know about the ever-evolving entertainment landscape.',
    keywords: 'entertainment, movies, music, pop culture, celebrity news, entertainment industry'
  }
  


export default function Entertainment() {
return (
<>
<Navbar/>
<FeatureEntertainmentArticle/>
<HeadlineEntertainmentArticle/>
<Footer/>
</>
)
}
