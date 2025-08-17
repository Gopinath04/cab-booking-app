import React from 'react';
import BookCabForm from '../components/BookCabForm';
import InnerBanner from "../components/innerbanner";


const bannerdata = {
title: "Booking",
navtext: "Manage your cab bookings",
};

export default function Booking() {
  return (
    <article>
      <InnerBanner bannertext={bannerdata} />
    
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <BookCabForm />
    </div>
    </article>
  );
}
