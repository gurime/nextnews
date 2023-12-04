import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import HeadlineSportsArticle from './HeadlineSportsArticle'
import FeatureSportsArticle from './FeatureSportsArticle'

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
