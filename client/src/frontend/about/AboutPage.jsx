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
              <h1>About OR-Stretch™️</h1>
              <p>
                The free Mayo Clinic web- app is designed to alleviate the
                physical discomfort of surgery and reduce the risk of
                musculoskeletal issues in surgeons. The OR-Stretch app guides
                surgeons through ~1 minute of intraoperative stretches and
                includes a reminder for stretching. There is a snooze option if
                the stretches need to be delayed. The evidence-based stretches
                are designed to be performed at the bedside either standing or
                seated with no need to scrub out.
              </p>
              <p>
                There is also a set of stretches designed to be performed
                unobtrusively between surgeries {"  "}(
                <a href="../../../mayoclinic.pdf" download>
                  PDF
                </a>{" "}
                &{" "}
                <a
                  target="_blank"
                  href="https://mssvideoupload.mayo.edu/media/Mayo+Clinic+OR-Stretch+Between+Surgery+Stretches+Video/1_xt9dg7ce"
                >
                  Video
                </a>
                )
              </p>
              <p>
                To use OR-Stretch, simply log in with your email—no password
                required.
              </p>
              <p>
                You will be asked to complete a brief demographic survey after
                logging in the first time. You will be sent periodic emails to
                help Mayo Clinic improve OR-Stretch.
              </p>
              <p>
                If you have comments or questions, email{"  "}
                <a target="_blank" href="mailto:ORSTRETCH@mayo.edu">
                  ORSTRETCH@mayo.edu
                </a>
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
                postures assumed when performing surgery. In the Web-app, the
                video-guided stretches include a timer to remind the surgical
                team to perform these stretches at certain time intervals with a
                snooze alarm if it is not a good time to take a break.
              </p>
              <p>
                Also available are two poster PDFs showing
                {"  "}
                <a download href="../../../standing.pdf">
                  standing
                </a>{" "}
                {"  "} and {"     "}
                <a download href="../../../seated.pdf">
                  seated
                </a>
                {"  "}
                exercises plus a video that offers tips to get more out of the
                intraoperative stretches. For example, pinch your shoulder
                blades together when pulling hands back to chest. You can
                perform the Intraoperative stretches either standing or seated.
                In addition, we have a longer video demonstrating how to get
                more out of each stretch (
                <a
                  target="_blank"
                  href="https://mssvideoupload.mayo.edu/media/Mayo+Clinic+OR-Stretch+Between+Surgery+Stretches+Video/1_xt9dg7ce"
                >
                  video
                </a>
                ). Here is a quickstart guide to help you{" "}
                <a href="../../../getstarted.pdf" download>
                  get started.
                </a>
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
                printable Between Surgery Stretches{" "}
                <a href="../../../mayoclinic.pdf" download>
                  PDF
                </a>{" "}
                or a guided{" "}
                <a
                  target="_blank"
                  href="https://mssvideoupload.mayo.edu/media/Mayo+Clinic+OR-Stretch+Between+Surgery+Stretches+Video/1_xt9dg7ce"
                >
                  video
                </a>{" "}
                for surgical staff.
              </p>
            </div>
          </div>
          <div className={style.section_four}>
            <h1>
              Our Mission <QuestionMark />
            </h1>
            <p>
              OR-Stretch is designed by ergonomists, OT/PTs and surgeons to
              counteract the mental and physical stress surgeons face in the
              operating room. By incorporating these simple stretches, our goal
              is to enhance your performance, reduce pain, and improve mental
              focus without prolonging operative time.
              {"  "}
              <a
                target="_blank"
                href="https://www.mayo.edu/research/labs/human-factors-engineering/overview"
              >
                Recent studies
              </a>{" "}
              show positive results, with attending surgeons experiencing
              reduced shoulder discomfort and minimal impact on workflow by
              incorporating microbreaks with OR-Stretch exercises. Surgeons who
              integrated OR-Stretch into their routine have found that
              OR-Stretch is an effective solution for mitigating work-related
              musculoskeletal fatigue and promoting surgeons' and surgical
              teams’ overall well-being.
            </p>
            <img src="/assets/imgs/surg.jpg" alt="surgery image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
