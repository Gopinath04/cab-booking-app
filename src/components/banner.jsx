import { useEffect } from "react";

export default function HomeBanner() {
  useEffect(() => {
    function adjustHeight() {
      const windowHeight = window.innerHeight;
      const header = document.querySelector(".default-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const fitscreenHeight = windowHeight - headerHeight;

      document.querySelectorAll(".fullscreen").forEach((el) => {
        el.style.height = `${windowHeight}px`;
      });

      document.querySelectorAll(".fitscreen").forEach((el) => {
        el.style.height = `${fitscreenHeight}px`;
      });
    }

    adjustHeight();
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  return (
    <section className="banner-area relative" id="home">
      <div className="overlay overlay-bg"></div>
      <div className="container">
        <div className="row fullscreen d-flex align-items-center justify-content-between">
          <div className="banner-content col-lg-6 col-md-6">
            <h6 className="text-white">Need a ride? just call</h6>
            <h1 className="text-uppercase">911 999 911</h1>
            <p className="pt-10 pb-10 text-white">
              Whether you enjoy city breaks or extended holidays in the sun, you
              can always improve your travel experiences by staying in a small.
            </p>
            <a href="/booking" className="primary-btn text-uppercase">
              Book a cab
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
