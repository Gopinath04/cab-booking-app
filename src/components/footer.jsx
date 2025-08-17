import React from 'react';
import Image from 'react-bootstrap/Image';

const Footer = () => {
    return (
        	
			<footer className="footer-area section-gap">
				<div className="container">
					<div className="row">
						<p className="mt-80 mx-auto footer-text col-lg-12">
                            © {new Date().getFullYear()} Cab Booking. All rights reserved.
						</p>											
					</div>
				</div>
				<img className="footer-bottom" src="/images/footer-bottom.png" alt="" />
			</footer>	
				
    );
};

export default Footer;