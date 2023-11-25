import { Monitoring, QueryStat } from "../../../../frontend/utils/svg";
import { Table } from "../../components";
import style from "./surevydata.module.css";
function SurveyData() {
  const tableColumn = [
    { heading: "User ID", value: "userId" },
    { heading: "Event Name", value: "event_type" },
    { heading: "Event Date", value: "createdAt" },
  ];
  return (
    <div className={style.surveyDataWrapper}>
      <header>
        <h1>Back Office | Survey Data</h1>
      </header>
      <main>
        <div className={style.selectDataType}>
          <header>
            <h1>Survey Data</h1>
            <p>What type of survey are you interested in viewing right now?</p>
          </header>

          <div className={style.surveyType}>
            <div className={style.typeBox}>
              <QueryStat />
              <p>Baseline</p>
              <span>Data Pertaining To The Base Survey.</span>
            </div>
            <div className={style.typeBox}>
              <Monitoring />
              <p>End of day </p>
              <span>Data pertaining to the End of Days survey.</span>
            </div>
          </div>
          <button className={style.proceedButton}>Continue</button>
        </div>
      </main>
      <Table column={tableColumn} />
    </div>
  );
}

export default SurveyData;
