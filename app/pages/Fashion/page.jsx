import Navbar from '@/app/components/Navbar'
import React from 'react'
import FeatureFashionArticle from './FeatureFashionArticle'
import HeadlineFashionArticle from './HeadlineFashionArticle'
import Footer from '@/app/components/Footer'


export const metadata = {
title: 'iTruth News - Fashion',
description: 'Explore the latest trends and insights in the world of fashion with iTruth News. Stay stylish and well-informed with our coverage of fashion news, industry updates, and expert analyses.',
keywords: 'fashion, trends, style, industry updates, fashion news, expert analyses',
author: 'Phillip Andrew Bailey'
}


export default function Fashion() {
return (
<>
<Navbar/>
<FeatureFashionArticle/>
<HeadlineFashionArticle/>
<Footer/>
</>
)
}
