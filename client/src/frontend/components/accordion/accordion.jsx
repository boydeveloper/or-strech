import { useState } from "react";

import style from "./accordion.module.css";

function Accordion() {
  const data = [
    {
      title: "How do I get started with the Surgeon Stretch app?",
      content:
        "To get started, simply download the Surgeon Stretch app from your app store and follow the on-screen instructions for setup. You can also check our website for detailed guides.",
    },
    {
      title: "Are the stretches in the app safe for all surgical specialties?",
      content:
        "Yes, the stretches in the app are designed to be safe and beneficial for surgeons of all specialties. We've consulted with experts from various fields to ensure their effectiveness and safety.",
    },
    {
      title: "What is the best time to perform these stretches during surgery?",
      content:
        "The best time to perform these stretches is during natural breaks in the procedure, such as when you're waiting for lab results or instruments. These stretches are designed to be non-disruptive to the surgical process.",
    },
    {
      title: "Can I customize the stretches in the app for my specific needs?",
      content:
        "Yes, the Surgeon Stretch app allows you to customize your stretch routine based on your specific requirements and preferences. You can select stretches that target the areas you feel need the most attention.",
    },
    {
      title:
        "Is the Surgeon Stretch app compatible with both iOS and Android devices?",
      content:
        "Absolutely! The Surgeon Stretch app is available on both iOS and Android platforms. You can download it from the App Store or Google Play Store, depending on your device.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section>
      <header className={style.accodionHeader}>
        <h1>Frequently asked questions</h1>
      </header>
      <div className={style.accContainer}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`${style.accBox} ${
              index === activeIndex ? style.accordion__open : ""
            }`}
          >
            <div
              className={style.accHeader}
              onClick={() => toggleAccordion(index)}
            >
              <h1 data-animation="header">{item.title}</h1>
              <button>
                {index === activeIndex ? (
                  <ion-icon name="remove-outline"></ion-icon>
                ) : (
                  <ion-icon name="add-outline"></ion-icon>
                )}
              </button>
            </div>
            <div
              className={`${style.accContent} ${
                index === activeIndex ? style.accContent__open : ""
              }`}
            >
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Accordion;
