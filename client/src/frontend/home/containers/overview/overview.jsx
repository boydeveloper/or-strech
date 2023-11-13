import {
  BellIcon,
  CustomStrechesIcon,
  Offfline,
  Print,
  Rise,
  SwapVert,
} from "../../../utils/svg";
import style from "./overview.module.css";

function Overview() {
  return (
    <section className={style.features__wrapper}>
      <header>
        <span>FULL CONTROL</span>
        <h1>Packed with Innovative Features</h1>
      </header>
      <div className={style.features}>
        <div className={style.feature}>
          <div className={style.feature_header}>
            <div>
              <CustomStrechesIcon />
            </div>
            <h1>Customized Stretches</h1>
          </div>
          <p>
            Tailor the stretches to individual surgeon's needs, allowing for
            personalized routines that address specific strain points.
          </p>
        </div>
        <div className={style.feature}>
          <div className={style.feature_header}>
            <div>
              <Rise />
            </div>
            <h1>Progress Tracking</h1>
          </div>
          <p>
            Monitor your stretching progress over time with built-in tracking
            features, helping you maintain a healthy routine and improve your
            well-being.
          </p>
        </div>
        <div className={style.feature}>
          <div className={style.feature_header}>
            <div>
              <BellIcon />
            </div>
            <h1>Reminder Notifications</h1>
          </div>
          <p>
            Receive timely reminders to perform your interoperative stretches,
            ensuring you don't miss any sessions and maintain your posture
            during surgeries.
          </p>
        </div>
        <div className={style.feature}>
          <div className={style.feature_header}>
            <div>
              <Offfline />
            </div>
            <h1>Offline Access</h1>
          </div>
          <p>
            Access your stretches even without an internet connection, making it
            convenient for use in operating rooms where connectivity might be
            limited.
          </p>
        </div>
      </div>
      {/* <div className={`flex__container ${style.overviewWrapper}`}>
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
      </div> */}
    </section>
  );
}

export default Overview;
