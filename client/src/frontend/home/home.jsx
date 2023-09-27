import React from "react";
import {
  Hero,
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
} from "./containers/index";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <Footer />
    </div>
  );
}

export default Home;
