import React from "react";
import { Link } from 'react-router-dom';


export default function InnerBanner({bannertext}) {
  return (
   
			<section className="banner-area relative about-banner" id="home">	
				<div className="overlay overlay-bg"></div>
				<div className="container">				
					<div className="row d-flex align-items-center justify-content-center">
						<div className="about-content col-lg-12">
							<h1 className="text-white">
								{bannertext.title}			
							</h1>	
							<p className="text-white link-nav"><Link href="/">Home </Link>  <span>/</span>  {bannertext.navtext}</p>
						</div>	
					</div>
				</div>
			</section>
			
  );
}