import { Footer, Navbar } from "../components/index";
import style from "./Intraoperativesitting.module.css";
function IntraoperativeSitting() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className={style.IntraoperativeSittingWrapper}>
          <header>
            <h1>IntraOperative sitting</h1>
            <p>Within surgery sitting – Quick cues</p>
          </header>
          <main>
            <div className={style.excercise}>
              <div className={style.textbox}>
                <h1>Exercise 1: Base Position</h1>
                <div className={style.procedures}>
                  <li>Base position</li>
                  <li>Sit balanced on the front part of your chair </li>
                  <li>Feet shoulder width apart sitting tall</li>
                  <li>Fingers interlaced at the level of your belly button</li>
                </div>
              </div>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/basesittingposition.png"
                  alt="base position"
                />
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/deepbreathsitting.png"
                  alt="deep breath"
                />
              </div>
              <div className={style.textbox}>
                <h1>Exercise 2: Deep Breath</h1>
                <div className={style.procedures}>
                  <li>Deep breath in </li>
                  <li>And out</li>
                </div>
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.textbox}>
                <h1>Exercise 3: Shoulder shrug</h1>
                <div className={style.procedures}>
                  <li>Shrug your shoulders up</li>
                  <li>Then back</li>
                  <li>Then down keeping your chest up</li>
                </div>
              </div>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/shouldersittingShrug.png"
                  alt="shoulder shrug"
                />
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.img_box}>
                <img src="/assets/imgs/pushsittingaway.png" alt="push away" />
              </div>
              <div className={style.textbox}>
                <h1>Exercise 4: Push away</h1>
                <div className={style.procedures}>
                  <li>
                    Bring your arms up to shoulder height with palms facing your
                    chest
                  </li>
                  <li>Reach forward following with your shoulders</li>
                  <li>Return your hands to your chest.</li>
                  <li>Pinching shoulder blades together.</li>
                  <li>
                    Turn your hands over with palms facing away from your chest
                  </li>
                  <li>Reach forward again</li>
                  <li>
                    Return your hands to your chest then back to base position
                  </li>
                </div>
              </div>
            </div>

            <div className={style.excercise}>
              <div className={style.textbox}>
                <h1>Exercise 5: Neck extension </h1>
                <div className={style.procedures}>
                  <li>Lift face toward the ceiling dropping head back</li>
                  <li>Deep breath in</li>
                  <li>Release breath and return to facing forward</li>
                </div>
              </div>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/necksittingextension.png"
                  alt="neck extension"
                />
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.img_box}>
                <img src="/assets/imgs/neckflexion.png" alt="neck extension" />
              </div>
              <div className={style.textbox}>
                <h1>Exercise 6:Neck flexion</h1>
                <div className={style.procedures}>
                  <li>Tuck your chin to your chest </li>
                  <li>Continue curling forward</li>
                  <li>Return to base position</li>
                </div>
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.textbox}>
                <h1>Exercise 7: Upper spine rotation 1</h1>
                <div className={style.procedures}>
                  <li>
                    Hook left foot behind your right leg and lock your pelvis
                    facing forward
                  </li>
                  <li>Turn looking over right shoulder </li>
                  <li>Continue rotating with shoulders</li>
                  <li>Return to facing forward</li>
                  <li>Feet back in the base position</li>
                </div>
              </div>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/upperspinesittingrotation.png"
                  alt="upper spine rotation"
                />
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.img_box}>
                <img src="/assets/imgs/sidebending1.png" alt="side bending" />
              </div>
              <div className={style.textbox}>
                <h1>Exercise 8: Side bending 1</h1>
                <div className={style.procedures}>
                  <li>Side bend curling your trunk to the left</li>
                  <li>Return to the base position</li>
                </div>
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.textbox}>
                <h1>Exercise 9: Upper spine rotation 2</h1>
                <div className={style.procedures}>
                  <li>
                    Hook right foot behind your left leg lock your pelvis facing
                    forward
                  </li>
                  <li>Turn looking over left shoulder </li>
                  <li>Continue rotating with shoulders</li>
                  <li>Return to facing forward</li>
                  <li>Feet back in the base position</li>
                </div>
              </div>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/uppersittingspinerotation2.png"
                  alt="upper spine rotation"
                />
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.img_box}>
                <img src="/assets/imgs/sidebending2.png" alt="neck extension" />
              </div>
              <div className={style.textbox}>
                <h1>Exercise 10: Side bending 2</h1>
                <div className={style.procedures}>
                  <li>Side bend curling your trunk to the right</li>
                  <li>Return to the base position</li>
                </div>
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.textbox}>
                <h1>Exercise 11: Lumbar Extension </h1>
                <div className={style.procedures}>
                  <li>Take a deep and gently arch your low back</li>
                  <li>
                    Relax as you breathe out returning to the base position
                  </li>
                </div>
              </div>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/lumbarextensionsitting.png"
                  alt="neck extension"
                />
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/lumbarflexionsitting.png"
                  alt="lumbar flexion"
                />
              </div>
              <div className={style.textbox}>
                <h1>Exercise 12: Lumbar Flexion </h1>
                <div className={style.procedures}>
                  <li>
                    Take a deep breath in and perform abdominal crunch as you
                    exhale
                  </li>
                  <li>Return to the base position</li>
                </div>
              </div>
            </div>
            <div className={style.excercise}>
              <div className={style.textbox}>
                <h1>Exercise 13: Deep Breath</h1>
                <div className={style.procedures}>
                  <li>And finish with another deep breath in and out</li>
                </div>
              </div>
              <div className={style.img_box}>
                <img
                  src="/assets/imgs/deepbreathsitting.png"
                  alt="deep breath"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default IntraoperativeSitting;
