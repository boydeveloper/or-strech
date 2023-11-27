import React, { useState, useEffect } from "react";
import {
  BackIcon,
  Monitoring,
  QueryStat,
} from "../../../../frontend/utils/svg";
import { Button, Pagination, Table } from "../../components";
import style from "./surevydata.module.css";
import {
  getBaselineSurveys,
  getEodSurveys,
} from "../../../../Apis/surveys/surveyService";
import Loader from "../../../../components/Loader";
import { getExports } from "../../../../Apis/users/userService";
import { useAuth } from "../../../context/auth";

function SurveyData() {
  const [showSurveyTypeSelection, setShowSurveyTypeSelection] = useState(true);
  const [baselineSurveys, setBaselineSurveys] = useState([]);
  const [eodSurveys, setEodSurveys] = useState([]);
  const { user } = useAuth();
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedSurveyType, setSelectedSurveyType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const baselineColumn = [
    { heading: "User ID", value: "userid" },
    { heading: "Days per week", value: "days_per_week" },
    { heading: "Age", value: "age" },
    { heading: "Pain Open Surgery", value: "pain_open_surgery" },
    {
      heading: "Pain Laparoscopic Surgery",
      value: "pain_laparoscopic_surgery",
    },
    { heading: "Pain Robotic Surgery", value: "pain_robotic_surgery" },
    { heading: "Pain Past Six Months", value: "pain_past_six_months" },
    {
      heading: "Pain Interfered Relations",
      value: "pain_interfered_relations",
    },
    { heading: "Pain Interfered Sleep", value: "pain_interfered_sleep" },
    { heading: "Height", value: "height" },
    { heading: "Gender", value: "gender" },
    { heading: "Handness", value: "handness" },
    { heading: "Glove Size", value: "glove_size" },
    {
      heading: "Surgical Procedures per Day",
      value: "surgical_procedures_day",
    },
    { heading: "Exercise", value: "exercise" },
    { heading: "Primary Speciality", value: "primary_speciality" },
    { heading: "Years Open Surgery", value: "years_open_surgery" },
    {
      heading: "Years Laparoscopic Surgery",
      value: "years_laparoscopic_surgery",
    },
    { heading: "Years Robotic Surgery", value: "years_robotic_surgery" },
    { heading: "Most Common Procedures A", value: "most_common_procedures_a" },
    { heading: "Most Common Procedures B", value: "most_common_procedures_b" },
    { heading: "Most Common Procedures C", value: "most_common_procedures_c" },
    { heading: "Created At", value: "createdAt" },
    { heading: "Updated At", value: "updatedAt" },
  ];

  const eodColumn = [
    { heading: "User ID", value: "userid" },
    { heading: "Day", value: "day" },
    { heading: "Time", value: "createdAt" },
    { heading: "Complex Surgeries", value: "complex_surgeries" },
    { heading: "Difficult Surgeries", value: "difficult_surgeries" },
    { heading: "Distracting", value: "distracting" },
    { heading: "Flow Impact", value: "flow_impact" },
    { heading: "ID", value: "id" },
    { heading: "Impact Fatigue", value: "impact_fatigue" },
    { heading: "Impact Mental", value: "impact_mental" },
    { heading: "Impact Pain", value: "impact_pain" },
    { heading: "Impact Physical", value: "impact_physical" },
    {
      heading: "Mentally Demanding Surgeries",
      value: "mentaly_demanding_surgeries",
    },
    {
      heading: "Physically Demanding Surgeries",
      value: "physically_demanding_surgeries",
    },
    { heading: "Updated At", value: "updatedAt" },
  ];
  const fetchBaselineSurveys = async () => {
    try {
      setLoading(true);
      const baselineSurveys = await getBaselineSurveys(
        currentPage,
        usersPerPage
      );
      setLoading(false);
      console.log(baselineSurveys);
      setBaselineSurveys(baselineSurveys?.baselineSurveys);
      const totalBaseline = baselineSurveys?.totalNoOfSurveys;
      const calculatedPageCount = Math.ceil(totalBaseline / usersPerPage);
      setPageCount(calculatedPageCount);
    } catch (error) {
      throw error;
    }
  };
  // const exportIds = "";

  const handleExports = async () => {
    const surveyType =
      selectedSurveyType === "baseline" ? "baselinesurvey" : "endofdaysurvey";
    const endpoint = `/${surveyType}/export`;

    await getExports(
      endpoint,
      user?.token,
      `${
        selectedSurveyType === "baseline"
          ? "Baseline Survey"
          : "End of Day's Survey"
      }`
    );
  };

  const fetchEodSurveys = async () => {
    try {
      setLoading(true);
      const eodSurveys = await getEodSurveys(currentPage, usersPerPage);
      setLoading(false);
      console.log(eodSurveys);
      setEodSurveys(eodSurveys?.endOfDaySurveys);
      const totalEods = eodSurveys?.totalNoOfSurveys;
      const calculatedPageCount = Math.ceil(totalEods / usersPerPage);
      setPageCount(calculatedPageCount);
    } catch (error) {
      throw error;
    }
  };
  const handleGoBack = () => {
    setShowSurveyTypeSelection(true);
    setSelectedSurveyType(null);
  };

  const handleTypeBoxClick = (surveyType) => {
    setSelectedSurveyType(surveyType);
    setShowSurveyTypeSelection(false);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    fetchEodSurveys();
    fetchBaselineSurveys();
  }, [currentPage]);

  return (
    <div className={style.surveyDataWrapper}>
      <header>
        {!showSurveyTypeSelection && (
          <button className={style.back} onClick={handleGoBack}>
            <BackIcon />
            Go Back
          </button>
        )}
        <h1>
          Back Office |{"       "}
          {!showSurveyTypeSelection && (
            <>{selectedSurveyType === "baseline" ? "Baseline" : "End of Day"}</>
          )}
          {"    "}
          Survey Data
        </h1>
      </header>
      {!showSurveyTypeSelection && (
        <Button click={handleExports} textContent={"export Surveys"} />
      )}
      <main>
        {showSurveyTypeSelection && (
          <div className={style.selectDataType}>
            <header>
              <h1>Survey Data</h1>
              <p>
                What type of survey are you interested in viewing right now?
              </p>
            </header>
            <div className={style.surveyType}>
              <div
                className={style.typeBox}
                onClick={() => handleTypeBoxClick("baseline")}
              >
                <QueryStat />
                <p>Baseline</p>
                <span>Data Pertaining To The Base Survey.</span>
              </div>
              <div
                className={style.typeBox}
                onClick={() => handleTypeBoxClick("eod")}
              >
                <Monitoring />
                <p>End of day </p>
                <span>Data pertaining to the End of Days survey.</span>
              </div>
            </div>
          </div>
        )}

        {!showSurveyTypeSelection &&
          (loading ? (
            <div className={style.loaderContainer}>
              <Loader />
            </div>
          ) : (
            <Table
              column={
                selectedSurveyType === "baseline" ? baselineColumn : eodColumn
              }
              data={
                selectedSurveyType === "baseline" ? baselineSurveys : eodSurveys
              }
            />
          ))}

        {!showSurveyTypeSelection && (
          <div className={style.paginationButtons}>
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default SurveyData;
