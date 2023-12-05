import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import FeatureMilitaryArticle from './FeatureMilitaryArticle';
import HeadlineMilitaryArticle from './HeadlineMilitaryArticle';


export const metadata = {
    title: 'iTruth News - Military',
    description: 'Explore comprehensive coverage of global military affairs with iTruth News. Stay informed on the latest developments, strategic analyses, and geopolitical insights. Our dedicated team brings you in-depth reporting on defense policies, international conflicts, and the evolving landscape of armed forces worldwide.',
    keywords: 'military, defense, armed forces, news, iTruth News',
  };


export default function Military() {
return (
<>
<Navbar/>
<FeatureMilitaryArticle/>
<HeadlineMilitaryArticle/>
<Footer/>
</>
)
}
