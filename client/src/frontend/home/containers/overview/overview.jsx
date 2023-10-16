import style from "./overview.module.css";

function Overview() {
  return (
    <section className={style.overviews}>
      <h1> Explore the Benefits of OR-Stretch</h1>
      <div className={`flex__container ${style.overviewWrapper}`}>
        <div>
          <img
            className="img-responsive"
            src="assets/imgs/sectionone.jpg"
            alt="device"
          />
        </div>
        <div>
          <h1>Elevate Your Intraoperative Performance with OR-Stretch</h1>
          <p>
            OR-Stretch is a surgeon-developed solution for maintaining peak
            performance during surgery. Our short, targeted stretches are
            designed to combat the strains of surgery and promote ideal
            positioning – all while adhering to sterile protocols.
          </p>
        </div>
      </div>
      <div className={`flex__container ${style.overviewWrapper}`}>
        <div>
          <h1>Customize Your Stretch Routine</h1>
          <p>
            With OR-Stretch, you're in control. Set the time interval between
            stretches (from 20 to 55 minutes) and snooze the timer if necessary.
            Our app guides you through each stretch, so you don't have to
            remember them. If any movement causes discomfort, stop immediately.
          </p>
        </div>
        <div>
          <img
            className="img-responsive"
            src="assets/imgs/sectiontwo.jpg"
            alt="device"
          />
        </div>
      </div>
      <div className={`flex__container ${style.overviewWrapper}`}>
        <div>
          <img
            className="img-responsive"
            src="assets/imgs/sectionone.jpg"
            alt="device"
          />
        </div>
        <div>
          <h1>Prioritize Your Well-being with OR-Stretch</h1>
          <p>
            Surgeon health matters. OR-Stretch makes it easy to prioritize your
            well-being during demanding surgeries. Take a moment to refresh,
            refocus, and maintain your A-game with our surgeon-friendly
            stretches. Your patients and your body will thank you.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Overview;
