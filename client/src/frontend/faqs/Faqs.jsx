import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { ChevronDown, MinusSign, PlusSign } from "../utils/svg";
import style from "./faqs.module.css";
import { faqsData } from "./data";

function Faqs() {
  const [selectedCategory, setSelectedCategory] = useState("overview");
  const [activeIndex, setActiveIndex] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setActiveIndex(null);
    setDropdownVisible(false);
  };

  const splitQuestions = (questions) => {
    const middleIndex = Math.ceil(questions.length / 2);
    const leftColumn = questions.slice(0, middleIndex);
    const rightColumn = questions.slice(middleIndex);
    return [leftColumn, rightColumn];
  };

  const selectedCategoryData =
    faqsData.find((data) => data.category === selectedCategory) || {};

  const questions = selectedCategoryData.questions || [];
  const [leftColumnQuestions, rightColumnQuestions] = splitQuestions(questions);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className={style.faqsWrapper}>
          <header>
            <i className="fa-solid fa-lightbulb"></i>
            <i className="fa-solid fa-question"></i>
            <i className="fa-solid fa-question"></i>
            <i className="fa-solid fa-brain"></i>

            <h1>Frequently asked Questions???</h1>

            <p>
              Explore the precise answers to your inquiries through our
              comprehensive FAQs, guiding you towards optimal surgical
              well-being with OR-Stretch
            </p>
          </header>
          <div className={style.faqsDropdown} ref={dropdownRef}>
            <div className={style.currentFaq} onClick={toggleDropdown}>
              {selectedCategory.toUpperCase()}
              <button>
                <ChevronDown />
              </button>
            </div>
            {dropdownVisible && (
              <div className={style.dropdown}>
                {faqsData.map((categoryData) => (
                  <span
                    key={categoryData.category}
                    onClick={() => handleCategoryChange(categoryData.category)}
                  >
                    {categoryData.category.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className={style.faqs}>
            <div className={style.faqs_left}>
              {leftColumnQuestions.map((faq, index) => (
                <div
                  className={`${style.question_box} ${
                    index === activeIndex ? style.expanded : ""
                  }`}
                  key={index}
                >
                  <div className={style.question}>
                    <h1>{faq.question}</h1>
                    <button onClick={() => toggleAccordion(index)}>
                      {index == activeIndex ? <MinusSign /> : <PlusSign />}
                    </button>
                  </div>
                  <div className={`${style.answer}`}>{faq.answer}</div>
                </div>
              ))}
            </div>
            <div className={style.faqs_right}>
              {rightColumnQuestions.map((faq, index) => (
                <div
                  className={`${style.question_box} ${
                    index + leftColumnQuestions.length === activeIndex
                      ? style.expanded
                      : ""
                  }`}
                  key={index + leftColumnQuestions.length}
                >
                  <div className={style.question}>
                    <h1>{faq.question}</h1>
                    <button
                      onClick={() =>
                        toggleAccordion(index + leftColumnQuestions.length)
                      }
                    >
                      {index == activeIndex ? <MinusSign /> : <PlusSign />}
                    </button>
                  </div>
                  <div className={`${style.answer}`}>{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faqs;
