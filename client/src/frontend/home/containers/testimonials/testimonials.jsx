import style from "./testimonials.module.css";

function Testimonials() {
  const testimonials = [
    {
      author: "Dr. Emily Rodriguez, MD",
      text: "I've been using the Surgeon Stretch app for months, and it's made a world of difference in how I feel after a long surgery. My back and shoulders used to ache, but these stretches have alleviated the strain. It's a game-changer!",
      imgSrc: "/assets/imgs/1.png",
    },
    {
      author: "Dr. Michael Chang, Surgeon",
      text: "The Surgeon Stretch app is a must-have for anyone in the operating room. It's not just about physical relief; it helps me stay focused and alert during lengthy procedures. I can't thank the creators enough for this innovation.",
      imgSrc: "/assets/imgs/2.png",
    },
    {
      author: "Dr. Sarah Mitchell, General Surgeon",
      text: "As a surgeon, I'm always concerned about maintaining sterility. This app's sterile stretches have made it possible for me to care for my well-being during surgery without compromising patient safety. It's a brilliant solution.",
      imgSrc: "/assets/imgs/3.jpg",
    },
    {
      author: "Dr. David Patel, Cardiothoracic Surgeon",
      text: "Long hours in the OR used to take a toll on my body. The Surgeon Stretch app has transformed my surgical experience. These stretches are designed by surgeons, for surgeons, and they've become an integral part of our routines.",
      imgSrc: "/assets/imgs/4.jpg",
    },
    {
      author: "Dr. Jennifer Lewis, Orthopedic Surgeon",
      text: "I was introduced to the Surgeon Stretch app by a colleague, and it's become an essential tool in my practice. The tailored stretches for orthopedic surgeons are fantastic. I feel more energized and less fatigued after surgeries.",
      imgSrc: "/assets/imgs/5.webp",
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
            <h1>{testimonial.text}</h1>
            <div className={style.profileBox}>
              <div className={style.profileImg}>
                <img src={testimonial.imgSrc} alt={testimonial.author} />
              </div>
              <p>{testimonial.author}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={style.testimonialCta}>
        <button>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <button>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    </section>
  );
}

export default Testimonials;
