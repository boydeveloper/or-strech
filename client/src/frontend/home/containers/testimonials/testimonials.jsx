import { LeftIcon, RightIcon } from "../../../utils/svg";
import style from "./testimonials.module.css";

function Testimonials() {
  const testimonials = [
    {
      author: "Dr.Emilly D",
      text: "I've been using the Surgeon Stretch app for months, and it's made a world of difference in how I feel after a long surgery. My back and shoulders used to ache, but these stretches have alleviated the strain. It's a game-changer!",
      imgSrc: "/assets/imgs/default.webp",
    },
    {
      author: "Dr. M Chang",
      text: "The Surgeon Stretch app is a must-have for anyone in the operating room. It's not just about physical relief; it helps me stay focused and alert during lengthy procedures. I can't thank the creators enough for this innovation.",
      imgSrc: "/assets/imgs/default.webp",
    },
  ];
  return (
    <section>
      <header className={style.testimonialsHeader}>
        <h1>What Surgeons are saying?</h1>
      </header>
      <div className={style.testimonials}>
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
