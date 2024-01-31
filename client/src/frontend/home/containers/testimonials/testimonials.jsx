import { LeftIcon, RightIcon } from "../../../utils/svg";
import style from "./testimonials.module.css";

function Testimonials() {
  const testimonials = [
    {
      author: "Dr. RG:",
      text: "The exercises have been well received among the OR team. All eight of us did them together and all gave positive feedback! No one complained that it was a bad idea, distraction, or waste of time.",
      imgSrc: "/assets/imgs/default.webp",
    },
    {
      author: "Dr. MR",
      text: "Helped me realize the stress I was adding to my upper back and neck.  It was good that somebody else was timing it so I did not have to do it myself (it won't happen),also liked the flexibility that if it was not a good moment I was able to defer it to a better time",
      imgSrc: "/assets/imgs/default.webp",
    },
    {
      author: "Dr. SH",
      text: "I really enjoyed this.  Thought it would be a bit more distracting than it was but found it to be refreshing.  I feel great and am usually flat on my back at the end of these cases.",
      imgSrc: "/assets/imgs/default.webp",
    },

    {
      author: "Dr. GG",
      text: "This program has gotten rid of my headaches that I often get at the end of an OR day!",
      imgSrc: "/assets/imgs/default.webp",
    },
    {
      author: "Dr. AP",
      text: "extremely valuable and impactful for the WHOLE team (especially circulating and scrub nurses who seemed to appreciate it the most!)",
      imgSrc: "/assets/imgs/default.webp",
    },
  ];
  const testimonialsContainer = document.querySelector(
    ".testimonialsContainer"
  );

  const handleScroll = (scrollPosition) => {
    testimonialsContainer.scrollLeft = scrollPosition;
  };

  const scrollToStart = () => {
    handleScroll(0);
  };

  const scrollToEnd = () => {
    const scrollPosition =
      testimonialsContainer.scrollWidth - testimonialsContainer.offsetWidth;
    handleScroll(scrollPosition);
  };

  return (
    <section>
      <header className={style.testimonialsHeader}>
        <h1>What Surgeons are saying?</h1>
        <div className={style.testimonial_cta}>
          <button onClick={scrollToStart}>
            <LeftIcon />
          </button>
          <button onClick={scrollToEnd}>
            <RightIcon />
          </button>
        </div>
      </header>
      <div className={`testimonialsContainer ${style.testimonials}`}>
        {testimonials.map((testimonial, index) => (
          <div className={style.testimonialBox} key={index}>
            <div className={style.profileBox}>
              <div className={style.profileImg}>
                <img src={testimonial.imgSrc} alt={testimonial.author} />
              </div>
              <p>{testimonial.author}</p>
            </div>
            <h1>{testimonial.text}</h1>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
