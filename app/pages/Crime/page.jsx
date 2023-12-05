import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import HeadlineCrimeArticle from './HeadlineCrimeArticle'
import FeatureCrimeArticle from './FeatureCrimeArticle'

export const metadata = {
    title: 'iTruth News - Crime',
    description: 'Uncover the most recent developments in U.S. crime with iTruth News, your reliable source for precise and timely information. Stay ahead of the curve as we bring you accurate updates, ensuring you`re well-informed in the evolving landscape of crime news.',
    keywords: 'crime, crime news, U.S. crime, crime developments, crime updates, crime information'
  }


export default function Crime() {
return (
<>
<Navbar/>
<FeatureCrimeArticle/>
<HeadlineCrimeArticle/>
<Footer/>
</>
)
}
