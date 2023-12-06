import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import ContributeForm from './ContributeForm'


export const metadata = {
  title: 'iTruth News - Contribute',
  description: 'Support iTruth News by contributing financially. Help sustain truthful journalism and ensure the delivery of unbiased news. Your contribution makes a difference in keeping us in business and committed to honest reporting.',
  keywords: 'contribute, financial support, journalism, unbiased news, honest reporting, support news'
}





export default function Contribute() {
  return (
    <>
    <Navbar/>
<ContributeForm/>
    <Footer/>
    </>
  )
}
