import "./sectionone.css";
function SectionOne() {
  return (
    <section id="#whatis">
      <div className="container">
        <header className="section__header">
          <h1 className="heading--title">
            What is{"  "}
            <span>ORStretch</span>?
          </h1>
        </header>
        <div className="flex__container">
          <div>
            <img
              className="img-responsive"
              src="assets/imgs/sectionone.jpg"
              alt="device"
            />
          </div>
          <div className="section__textbox">
            <h1>
              A short intraoperative set of stretches developed by surgeons for
              surgeons.
            </h1>
            <p>
              The stretches aim to counteract the effects of intraoperative
              strains of surgeon’s positions and posture and are performed
              without breaking scrub.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionOne;
