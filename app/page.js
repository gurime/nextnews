import ArtilceList from "./Articles/ArtilceList";
import FeatureArticle from "./components/FeatureArticle";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata = {
  title: 'iTruth News - Breaking News Updates, Latest News Headlines',
  description: 'Stay informed with iTruth News - your reliable source for breaking news updates and the latest headlines. Explore in-depth analyses, timely coverage, and accurate insights across a wide range of topics. Your go-to platform for staying ahead in a rapidly evolving world.',
  keywords: 'breaking news, latest news headlines, news updates, in-depth analyses, timely coverage, accurate insights, current events, global news'
}

export default function Home() {
  return (
    <>
<Navbar/>
<FeatureArticle/>
<ArtilceList/>
<Footer/>
    </>
  )
}
