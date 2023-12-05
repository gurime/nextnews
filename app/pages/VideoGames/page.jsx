import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import HeadlineVideoGamesArticle from './HeadlineVideoGamesArticle'
import FeatureVideoGamesArticle from './FeatureVideoGamesArticle'



export const metadata = {
    title: 'iTruth News - Video Games',
    description: 'Dive into the exciting world of video games with iTruth News. Stay up-to-date on the latest gaming news, reviews, and in-depth analyses. Your ultimate source for immersive content, exploring gaming trends, and uncovering the stories that shape the video game industry.',
    keywords: 'video games, gaming news, game reviews, gaming analyses, gaming trends, video game industry, immersive gaming, gaming content'
  }
  


export default function VideoGames() {
return (
<>
<Navbar/>
<FeatureVideoGamesArticle/>
<HeadlineVideoGamesArticle/>
<Footer/>
</>
)
}
