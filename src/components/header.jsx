import React from "react";
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <header id="header">
		  		<div className="header-top">
				</div>
			    <div className="container main-menu">
			    	<div className="align-items-center justify-content-between d-flex">
			    		<Link to="/" className="logotext">My Cab Booking</Link>		
						<nav id="nav-menu-container">
							<ul className="nav-menu">
							  <li className="menu-active"><Link to="/">Schedule Cab</Link></li>
							  <li><Link to="about.html">Fare Information</Link></li>
							  <li><Link to="service.html">Areas Serve</Link></li>
							  <li><Link to="gallery.html">Contact Us</Link></li>
							  <li><Link to="/login">Login</Link></li>							  			          	          
							  <li><Link to="/signup">Signup</Link></li>
							</ul>
						</nav>	
			    	</div>
			    </div>
			  </header>
  )
}
export default Header;