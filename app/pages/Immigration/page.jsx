import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import FeatureImmigrationArticle from './FeatureImmigrationArticle'
import HeadlineImmigrationArticle from './HeadlineImmigrationArticle'




export const metadata = {
    title: 'iTruth News - Immigration',
    description: 'Stay informed with comprehensive coverage on immigration matters from iTruth News. Your reliable source for accurate and timely information, providing insights into policy updates, global developments, and stories that shape the immigration landscape.',
    keywords: 'immigration, immigration news, policy updates, global developments, immigration landscape, immigration matters'
  }
  

export default function Immigration() {
return (
<>
<Navbar/>
<FeatureImmigrationArticle/>
<HeadlineImmigrationArticle/>
<Footer/>
</>
)
}
