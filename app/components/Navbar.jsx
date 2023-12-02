'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import navlogo from '../img/it.png'
import { useEffect, useState } from "react"
import Footer from "./Footer"





const Navbar = () => {
const router = useRouter()
const [isFooterVisible, setIsFooterVisible] = useState(false);

const toggleFooter = () => {
  setIsFooterVisible(!isFooterVisible);
};



return (
<>
<div className="nav">
<Image placeholder="blur" onClick={() => router.push('/')} src={navlogo} height={36} alt='...'  />

<input
placeholder="Search iTruth News"
type="search"
autoComplete="off"
spellCheck="false"
dir="auto"
tabIndex={0}

/>

      


<div className="navlinks">
<Link href="/">Home</Link>
<Link href="../pages/Technology">Technology</Link>
<Link href="../pages/Music">Music</Link>
<Link href="../pages/Politics">Politics</Link>
<Link href="../pages/Opinion">Opinion</Link>
<Link  href="../pages/Sports">Sports</Link>
<Link href='#!' onClick={toggleFooter} >More:</Link>
<button onClick={() => router.push('../pages/Contribute')} id="subbtn1"  >Contribute</button>

</div>


</div>
{isFooterVisible && <Footer  /> }



</>
)
}

export default Navbar