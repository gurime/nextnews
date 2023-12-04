import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import FeatureEconomyArticle from './FeatureEconomyArticle'
import HeadlineEconomyArticle from './HeadlineEconomyArticle'


export const metadata = {
    title: 'iTruth News - Economy',
    description: 'Immerse yourself in the realm of economic insights with iTruth News. Stay ahead of the curve with timely updates on the latest trends and in-depth analyses, ensuring you`re well-informed in the dynamic world of economics.',
    keywords: 'economy, economic insights, economic trends, in-depth analyses, financial updates, business news'
  }


export default function Economy() {
return (
<>
<Navbar/>
<FeatureEconomyArticle/>
<HeadlineEconomyArticle/>
<Footer/>
</>
)
}
