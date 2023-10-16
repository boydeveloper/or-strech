import React from "react";
import {
  Hero,
  SectionOne,
  SectionTwo,
  Testimonials,
  Facts,
} from "./containers/index";
import { Navbar, Footer, Accordion } from "../components/index";
function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Facts />
      <SectionOne />
      {/* <SectionTwo /> */}
      {/* <SectionThree /> */}
      <Testimonials />
      <Accordion />
      <Footer />
    </div>
  );
}

export default Home;
