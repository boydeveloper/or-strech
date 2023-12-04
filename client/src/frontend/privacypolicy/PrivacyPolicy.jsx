import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import style from "./privacypolicy.module.css";

function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className={style.PrivacyPolicyWrapper}>
          <header>
            <h1>Privacy Policy.</h1>
            <p>
              This privacy policy applies to data processed by Mayo Clinic's
              OR-Stretch web application (OR-Stretch). The changes made to this
              privacy policy are effective when posted to this webpage address.
              Your continued use of OR-Stretch means you accept those changes.
            </p>
          </header>

          <div className={style.content_one}>
            <h2>Information we collect from or about you</h2>
            <p>
              <strong>Information you give us.</strong>
              {"  "}
              You provide Mayo Clinic with personal data during:
            </p>
            <div>
              <li>Registration, using your name and email address.</li>
              <li>
                Baseline survey feedback — your answers are associated with your
                account.
              </li>
              <li>
                Feedback from surveys emailed to you after a stretching activity
                — your answers are associated with your account.
              </li>
            </div>
          </div>
          <div className={style.content_two}>
            <strong>Information automatically collected by OR-Stretch.</strong>
            <p>
              When you use OR-Stretch, data is collected about your usage, such
              as your settings preferences and the times you use OR-Stretch. A
              "session cookie" is used, which is a piece of data that stores a
              "session ID" to associate your actions with your account.
            </p>
          </div>

          <div className={style.content_three}>
            <h3>How we use information we collect from or about you</h3>
            <p>
              The information we collect is used to improve and optimize
              OR-Stretch. Each individual's data is combined into one data set
              and anonymized to study and improve OR-Stretch. Anonymized data is
              personal data that no longer identifies you, so it may be used for
              any other purpose and shared with third parties.
            </p>
          </div>
          <div className={style.content_four}>
            <h1>How we share information about you</h1>
            <p>
              Your personal data may be shared with companies who work on our
              behalf (processors) to provide and support OR-Stretch
            </p>
            <p>
              Pseudonymized data — data that does not directly identify you —
              may be shared with third parties to improve or optimize OR-Stretch
              and to enable those third parties to study OR-Stretch's
              performance.
            </p>
            <p>
              When personal data is shared with our processors or pseudonymized
              data with third parties, your data is safeguarded by a
              data-sharing agreement. Additionally, our data sharing has been
              reviewed by an Institutional Review Board in accordance with the
              United States' Health Insurance Portability and Accountability Act
              Privacy Rule.
            </p>
            <p>
              Your personal data may be disclosed if required by law or on the
              "good faith" belief that such sharing is necessary to (a) conform
              to applicable law or comply with legal process served on us; (b)
              protect and defend our rights or property, OR-Stretch, or our
              users; or (c) act to protect the personal safety of our employees
              and agents, other users of OR-Stretch, or members of the public.
            </p>
          </div>
          <div className={style.content_five}>
            <h1>How we secure the information we collect from or about you</h1>
            <p>
              To protect the information that we collect through OR-Stretch, a
              combination of physical, technical and administrative safeguards
              is used. Even though these precautions are used to safeguard your
              personal data, we cannot guarantee the security of the networks,
              systems, servers, devices and databases we operate or that are
              operated on our behalf.
            </p>
          </div>
          <div className={style.content_six}>
            <h1>Users in the European Economic Area (EEA) and Switzerland</h1>
            <p>
              The following information applies if you are a resident of the EEA
              or Switzerland.
            </p>
            <div className={style.list}>
              <li>
                <div>
                  <strong>
                    Purposes of processing and legal basis for processing.{" "}
                  </strong>
                  Your personal data is processed to provide and optimize
                  OR-Stretch with your consent, and you have the right to
                  withdraw consent at any time.
                </div>
              </li>
              <li>
                <div>
                  <strong>Transfers</strong>
                  {"   "} Personal data collected may be transferred to, and
                  stored and processed in, the United States or any other
                  country in which we or our affiliates or processors maintain
                  facilities. We ensure that transfers of personal data to a
                  third country or an international organization are subject to
                  appropriate safeguards.
                </div>
              </li>
              <li>
                <div>
                  <strong>Individual rights;</strong>
                  <p>
                    If you are a resident of the EEA or Switzerland, you are
                    entitled to the following rights:
                  </p>
                </div>
              </li>
              <div className={style.rights}>
                <li>
                  The right to access and rectify your data. You have the right
                  to obtain information about the processing of personal data
                  and a copy of your stored personal data. You have the right to
                  request we update your personal data if it is inaccurate or
                  incomplete.
                </li>
                <li>
                  The right to request data erasure. You have the right to have
                  your data erased from our systems if the data is no longer
                  necessary for the purpose for which it was collected, or you
                  withdraw consent and no other legal basis for processing
                  exists.
                </li>
                <li>
                  The right to restrict our processing. You have the right to
                  restrict our processing if you contest the accuracy of the
                  personal data stored about you, our processing is deemed
                  unlawful and you oppose erasure of your personal data, or we
                  no longer need the data for the purposes for which we
                  collected it, but we must store it to comply with our legal
                  obligations.
                </li>
                <li>
                  The right to object. You have the right to object to our
                  processing of personal data for scientific, historical, or
                  statistical research purposes.
                </li>
                <li>
                  The right to lodge a complaint. You have the right to file a
                  complaint about our data collection and processing actions
                  with your data protection authority.
                </li>
              </div>
            </div>
            <div className={style.note}>
              <strong>Note:</strong>
              <p>
                To verify your identity, we may require personal information
                prior to accessing any records containing information about you
              </p>
            </div>
          </div>
          <div className={style.contact}>
            <h1>Contact</h1>
            <div>
              <span>Mayo Privacy Officer:</span>
              <span>Mayo Clinic</span>
              <span>,200 First St. SW</span>
              <span>,Rochester, MN 55905</span>
              <span>Phone: 507-266-6286</span>
              <span>
                Email:
                <a href="mailto:dlenterpriseprivacyoffice@mayo.edu">
                  dlenterpriseprivacyoffice@mayo.edu
                </a>
              </span>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
