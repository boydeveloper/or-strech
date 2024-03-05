import { Footer, Navbar } from "../components";
import style from "./usefulLinks.module.css";

function UsefulLinks() {
  return (
    <>
      <Navbar />
      <div className={style.UseFullLinksWrapper}>
        <header>
          <h1>Useful links</h1>
        </header>

        <div className={style.tableContainer}>
          <table className={style.customTable}>
            <tbody>
              <tr>
                <td>
                  <a
                    target="_blank"
                    href="https://mssvideoupload.mayo.edu/media/Mayo%20Clinic%20OR-Stretch%20Between%20Surgery%20Stretches%20Video/1_xt9dg7ce"
                  >
                    OR-Stretch Between Surgery Stretches
                  </a>
                  {"   "}
                  (Video)
                </td>
                {/* <td>Video</td> */}
              </tr>
              <tr>
                <td>
                  <a
                    target="_blank"
                    href="https://mssvideoupload.mayo.edu/media/OR%20Stretch%20Standing/1_z9epq21s"
                  >
                    OR Stretch Standing Exercise
                  </a>
                  {"   "}
                  (Video)
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    target="_blank"
                    href="https://mssvideoupload.mayo.edu/media/OR%20Stretch%20Seated%20/1_yomeaqw1"
                  >
                    OR Stretch Seated Exercise
                  </a>
                  {"   "}
                  (Video)
                </td>
              </tr>
              <tr>
                <td>
                  <a download href="../../../mayoclinic.pdf">
                    {" "}
                    OR-Stretch Between Surgery Stretches
                  </a>{" "}
                  (PDF)
                </td>
              </tr>
              <tr>
                <td>
                  <a download href="../../../standing.pdf">
                    {" "}
                    OR Stretch Standing Exercise
                  </a>{" "}
                  {"   "}
                  (PDF)
                </td>
              </tr>
              <tr>
                <td>
                  <a href="../../../seated.pdf" download>
                    OR Stretch Seated Exercise
                  </a>
                  {"  "}
                  (PDF)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UsefulLinks;
