import { Footer, Navbar } from "../components";
import { Bulb, QuestionMark } from "../utils/svg";
import style from "./aboutPage.module.css";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className={style.aboutWrapper}>
          <div className={style.section_one}>
            <div className={style.text_box}>
              <h1>
                About OR-Stretch <Bulb />
              </h1>
              <p>
                The web app designed to alleviate the physical discomfort of
                surgery and reduce the risk of musculoskeletal issues in
                surgeons. This convenient tool guides practitioners through
                on-the-spot exercises, complete with timely reminders. Simply
                log in with your email—no password required. After the initial
                login, a brief demographic survey enhances the app's
                effectiveness. Your feedback, gathered through periodic emails,
                helps us continuously improve OR-Stretch, revolutionizing
                surgical practices and promoting long, healthy careers for
                medical professionals.
              </p>
            </div>
            <div className={style.img_box}>
              <img src="/assets/imgs/aboutimgI.jpg" alt="about image" />
            </div>
          </div>

          <div className={style.section_two}>
            <div className={style.text_box}>
              <h1>
                Intraoperative <span>stretches</span>
              </h1>
              <p>
                The Intraoperative OR-Stretch helps alleviate any fatigue and
                discomfort associated with the surgeon and surgical team's
                postures assumed when performing surgery. A video guide to these
                stretches is available in a web app that includes a timer to
                remind the surgical team to perform these stretches at certain
                time intervals.
              </p>
              <p>
                Also available are two poster{" "}
                <a download href="/assets/mayo-clinic-pdf.pdf">
                  PDFs
                </a>{" "}
                showing seated and standing exercises plus a{" "}
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=bLAeVbBjZV0"
                >
                  video
                </a>{" "}
                that offers tips to get more out of the intraoperative
                stretches. For example, pinch your shoulder blades together when
                pulling hands back to chest.
              </p>
            </div>
            <div className={style.img_box}>
              <img src="/assets/imgs/aboutimgII.jpg" alt="about image" />
            </div>
          </div>
          <div className={style.section_three}>
            <div className={style.img_box}>
              <img src="/assets/imgs/aboutimgIII.jpg" alt="about image" />
            </div>
            <div className={style.text_box}>
              <h1>
                Between
                {"  "}
                <span>surgery</span>
                {"  "}
                stretches
              </h1>
              <p>
                OR-Stretch offers quick, unobtrusive stretches to alleviate
                post-surgery fatigue. These can be done between cases or at the
                end of the day, taking less than five minutes. Choose between a
                printable Between Surgery Stretches PDF or a guided video for
                surgical staff. Additionally, our web app provides on-the-spot
                guidance, with no password required. Complete a brief
                demographic survey on your first login, and periodic emails help
                Mayo Clinic enhance the OR-Stretch experience, reducing the risk
                of musculoskeletal issues for surgeons.
              </p>
            </div>
          </div>
          <div className={style.section_four}>
            <h1>
              Our Mission <QuestionMark />
            </h1>
            <p>
              OR-Stretch is on a mission to alleviate the mental and physical
              stress surgeons face in the operating room. By incorporating
              simple stretches, our goal is to enhance performance, reduce pain,
              and improve mental focus without prolonging operative time. Recent
              studies show positive results, with attending surgeons
              experiencing reduced shoulder discomfort and minimal impact on
              workflow by incorporating microbreaks with OR-Stretch exercises.
              Surgeons express a keen interest in integrating these breaks into
              their routine, demonstrating OR-Stretch as an effective solution
              for mitigating work-related musculoskeletal fatigue and promoting
              surgeons' overall well-being.
            </p>
            <img src="/assets/imgs/surg.jpg" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
