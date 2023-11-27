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

function SurveyData() {
  const [showSurveyTypeSelection, setShowSurveyTypeSelection] = useState(true);
  const [baselineSurveys, setBaselineSurveys] = useState([]);
  const [eodSurveys, setEodSurveys] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedSurveyType, setSelectedSurveyType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const baselineColumn = [
    { heading: "User ID", value: "userid" },
    { heading: "Days per week", value: "days_per_week" },
    { heading: "Age", value: "age" },
  ];
  const eodColumn = [
    { heading: "User ID", value: "userid" },
    { heading: "Day", value: "day" },
    { heading: "Time", value: "createdAt" },
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

  const fetchEodSurveys = async () => {
    try {
      setLoading(true);
      const eodSurveys = await getEodSurveys(currentPage, usersPerPage);
      setLoading(false);
      console.log(eodSurveys);
      setEodSurveys(eodSurveys?.endOfDaySurveys);
      const totalEods = activities?.totalNoOfSurveys;
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
      {!showSurveyTypeSelection && <Button textContent={"export Surveys"} />}
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
