import "./sectionthree.css";
function SectionThree() {
  return (
    <div>
      <div id="reviews" className="section reviews pb-70 bg-white">
        <div className="container">
          <div className="row clearfix">
            <header className="section__header">
              <h1 className="heading--title">What Surgeons are saying</h1>
            </header>
          </div>
          <div className="testimonials">
            <div className="testimonial">
              <div className="testimonial--img">
                <img src="/assets/imgs/1.png" alt="author" />
              </div>
              <div className="testimonial--body">
                <div className="testimonial--author">
                  <h5>Dr. Mark Smith</h5>
                </div>
                <div className="testimonial--job">Mayo Clinic.</div>
                <p>
                  "This should be used to tell a story and include any
                  testimonials you might have about your product or service for
                  your clients."
                </p>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial--img">
                <img src="/assets/imgs/2.png" alt="author" />
              </div>
              <div className="testimonial--body">
                <div className="testimonial--author">
                  <h5>Dr. Jessy Arthur</h5>
                </div>
                <div className="testimonial--job">
                  Cleveland Children's Hospital.
                </div>
                <p>
                  "This should be used to tell a story and include any
                  testimonials you might have about your product or service for
                  your clients."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionThree;
