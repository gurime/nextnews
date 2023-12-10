import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: 'iTruth News - Register',
  description: 'Stay informed with iTruth News - your reliable source for breaking news updates and the latest headlines. Explore in-depth analyses, timely coverage, and accurate insights across a wide range of topics. Your go-to platform for staying ahead in a rapidly evolving world.',
  keywords: 'breaking news, latest news headlines, news updates, in-depth analyses, timely coverage, accurate insights, current events, global news'
}

export default function Register() {

return (
<>
<Navbar/>
<RegisterForm/>
<Footer/>
</>
)
}
