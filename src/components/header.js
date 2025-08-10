import React from "react";
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <header id="header">
		  		<div className="header-top">
				</div>
			    <div className="container main-menu">
			    	<div className="align-items-center justify-content-between d-flex">
			    		<Link href="index.html" className="logotext">My Cab Booking</Link>		
						<nav id="nav-menu-container">
							<ul className="nav-menu">
							  <li className="menu-active"><Link href="index.html">Schedule Cab</Link></li>
							  <li><Link href="about.html">Fare Information</Link></li>
							  <li><Link href="service.html">Areas Serve</Link></li>
							  <li><Link href="gallery.html">Contact Us</Link></li>
							  <li><Link href="elements.html">Login</Link></li>							  			          	          
							  <li><Link href="contact.html">Signup</Link></li>
							</ul>
						</nav>	
			    	</div>
			    </div>
			  </header>
  )
}
export default Header;