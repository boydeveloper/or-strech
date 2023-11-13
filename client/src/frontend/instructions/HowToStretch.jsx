import { Footer, Navbar } from "../components";
import style from "./howtostretch.module.css";
function HowToStretch() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className={style.instructionsWrapper}>
          <div className={style.section_one}>
            <header>
              <span>support</span>
              <h1>INSTRUCTIONS ?</h1>
            </header>
            <p>
              surgeons are routinely subject to mental and physical stress
              throughout the course of their work in the operating room.
              Consistent mental and physical fatigue can shorten a surgeon's
              career and affect patient safety and personal relationships.
              Simple stretching, with OR-Stretch, can be a practical, effective
              means to reduce pain, enhance performance and increase mental
              focus without extending operative time. A recent study of
              attending surgeons from four medical centers volunteering to
              incorporate microbreaks with exercises into their surgical day
              reported improvement or no change in their mental focus and
              physical performance. Discomfort in the shoulders was
              significantly reduced, while distractions and flow impact were
              minimal. When surveyed, most of the surgeons wanted to incorporate
              the microbreaks with exercises into their OR routine.
              Intraoperative microbreaks, using OR-Stretch, with exercises is an
              easy way to mitigate work-related musculoskeletal fatigue, pain
              and injury.
            </p>
          </div>
          <div className={style.section_two}>
            <h1>How to stretch</h1>
            <p>
              When surgeons have a break during or between surgeries, stretches
              can aid recovery from the effects of long procedures. The routines
              can be performed using the instructional PDF and video links found
              on this page, or using the online app.
            </p>
            <div className={style.section_two__steps}>
              <h2>For safe and effective stretches:</h2>
              <div className={style.steps}>
                <li>
                  Perform the activities slowly, avoiding rapid or forceful
                  movements.
                </li>
                <li>Keep breathing relaxed throughout all activities.</li>
                <li>
                  If any activity causes discomfort, stop performing the
                  activity.
                </li>
              </div>
            </div>
          </div>
          <div className={style.section_three}>
            <h1>Intraoperative stretches</h1>
            <p>
              The Intraoperative OR-Stretch helps alleviate any fatigue and
              discomfort associated with the surgeon and surgical team's
              postures assumed when performing surgery. A video guide to these
              stretches is available in a web app that includes a timer to
              remind the surgical team to perform these stretches at certain
              time intervals.
            </p>
            <p>
              Also available are two poster PDFs showing seated and standing
              exercises plus a video that offers tips to get more out of the
              intraoperative stretches. For example, pinch your shoulder blades
              together when pulling hands back to chest.
            </p>
          </div>
          <div className={style.section_four}>
            <h1>Between surgery stretches</h1>
            <p>
              The between-surgery OR-Stretch helps alleviate any fatigue and
              discomfort that may persist after performing surgery. These can be
              performed outside the operating room in between cases or after the
              final case of the day. These stretches have been designed to be
              unobtrusive and take less than five minutes to perform.
            </p>
            <p>
              An OR-Stretch — Between Surgery Stretches (PDF) is available for
              printout. Or this OR-Stretch Between Surgery Stretches Video
              guides surgical staff through a short series of stretches to
              counteract the most frequent postures during surgery and can be
              done in the break room between surgical cases.
            </p>
          </div>
          <div className={style.section_five}>
            <h1>OR-Stretch App</h1>
            <p>
              To alleviate the physical discomfort surgery imposes, try out our
              convenient OR-Stretch web app. Following this protocol can help
              reduce the risk of developing musculoskeletal issues that can
              shorten surgeons' careers.
            </p>
            <p>
              The OR-Stretch app guides surgeons through exercises on the spot
              and includes a reminder for stretching. To use OR-Stretch, simply
              log in to the web app using an email address; a password is not
              required. You will be asked to complete a brief demographic survey
              after logging in for the first time. You will be sent periodic
              emails to help Mayo Clinic improve OR-Stretch.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HowToStretch;
