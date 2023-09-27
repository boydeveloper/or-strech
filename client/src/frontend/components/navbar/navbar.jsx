import { Link } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarClass = isScrolled ? "navbar scrolled" : "navbar";
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="container">
      <nav className={navbarClass}>
        <div className="logo">
          <img src="/assets/svgs/mayo-clinic-logo.svg" alt="mayo logo" />
        </div>
        <div className="navbar__links">
          <Link hrefLang="#about">Home</Link>
          <Link hrefLang="#about">About</Link>
          <Link hrefLang="#about">Testimonials</Link>
          <Link hrefLang="#about">Faqs</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
