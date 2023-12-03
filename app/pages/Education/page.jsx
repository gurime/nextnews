import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import React from 'react'
import HeadlineEducationArticle from './HeadlineEducationArticle'
import FeatureEducationArticle from './FeatureEducationArticle'


export const metadata = {
  title: 'iTruth News - Education',
  description: 'Stay informed on educational updates and advancements with iTruth News. Keeping you in the know about the latest trends and developments in the world of education.',
  keywords: 'education, educational updates, trends in education, advancements in education, latest developments in education'
}


export default function Education() {
  return (
    <>
    <Navbar/>
    <FeatureEducationArticle/>
    <HeadlineEducationArticle/>
    <Footer/>
    </>
  )
}
