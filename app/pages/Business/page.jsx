import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import FeatureBusinessArticle from './FeatureBusinessArticle'
import HeadlineBusinessArticle from './HeadlineBusiness'


export const metadata = {
    title: 'iTruth News - Business',
    description: 'Stay ahead in the business world with iTruth News. Explore the latest updates, trends, and analyses, providing you with accurate and timely information for informed decision-making. Your trusted source for navigating the dynamic landscape of business news.',
    keywords: 'business, business news, latest updates, trends in business, business analyses, informed decision-making, economic landscape'
  }
  


export default function Business() {
return (
<>
<Navbar/>
<FeatureBusinessArticle/>
<HeadlineBusinessArticle/>
<Footer/>
</>
)
}
