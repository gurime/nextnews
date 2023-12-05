import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import FeatureAfricaArticle from './FeatureAfricaArticle'
import HeadlineAfricaArticle from './HeadlineAfricaArticle'

export const metadata = {
    title: 'iTruth News - Africa',
    description: 'Explore the latest happenings in African affairs with iTruth News, your trustworthy outlet for precise and timely information. Stay informed about current events as we provide accurate updates, keeping you well-versed in the dynamic landscape of news from the African continent.',
    keywords: 'Africa news, African affairs, current events, news updates, accurate information'
}



export default function Africa() {
return (
<>
<Navbar/>
<FeatureAfricaArticle/>
<HeadlineAfricaArticle/>
<Footer/>
</>
)
}