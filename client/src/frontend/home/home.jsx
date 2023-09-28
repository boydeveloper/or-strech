import React from "react";
import {
  Hero,
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
} from "./containers/index";
import { Navbar, Footer } from "../components/index";
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
