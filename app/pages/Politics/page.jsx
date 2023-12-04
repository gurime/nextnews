import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import FeaturePoliticsArticle from './FeaturePoliticsArticle'
import HeadlinePoliticsArticle from './HeadlinePoliticsArticle'

export const metadata = {
    title: 'iTruth News | Politics',
    description: 'Stay informed on the latest political developments with iTruth News. Dive into insightful analyses, breaking news, and comprehensive coverage. Your source for accurate and timely political reporting, featuring in-depth insights, election updates, and global political affairs.',
    keywords: 'politics, political news, political developments, insightful analyses, breaking news, comprehensive coverage, election updates, global political affairs'
  }
  

export default function Politics() {
return (
<>
<Navbar/>
<FeaturePoliticsArticle/>
<HeadlinePoliticsArticle/>
<Footer/>
</>
)
}
