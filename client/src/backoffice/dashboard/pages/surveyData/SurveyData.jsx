import React, { useState, useEffect } from "react";
import {
  BackIcon,
  Monitoring,
  PlusCircle,
  QueryStat,
} from "../../../../frontend/utils/svg";
import { Button, Pagination, Table } from "../../components";
import style from "./surevydata.module.css";
import {
  deleteCustomSurvey,
  getAllCustomSurveys,
  getBaselineSurveys,
  getEodSurveys,
} from "../../../../Apis/surveys/surveyService";
import Loader from "../../../../components/Loader";
import { getExports } from "../../../../Apis/users/userService";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";
import SurveyBox from "./components/SurveyBox";
import DeletePrompt from "../../components/deletePrompt/deletePrompt";
import toast from "react-hot-toast";

function SurveyData() {
  const [showSurveyTypeSelection, setShowSurveyTypeSelection] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [baselineSurveys, setBaselineSurveys] = useState([]);
  const [eodSurveys, setEodSurveys] = useState([]);
  const { user } = useAuth();
  const [modal, setModal] = useState("");
  const [surveyidToBeDeleted, setSurveyIdToBeDeleted] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [selectedSurveyType, setSelectedSurveyType] = useState(null);

  const [selectOptions, setSelectOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customSurveys, setCustomSurveys] = useState(null);
  const [totalEntries, setTotalEntries] = useState(null);
  const baselineColumn = [
    { heading: "Days per week", name: "days_per_week", value: "days_per_week" },
    { heading: "Age", name: "age", value: "age" },
    {
      heading: "Pain Open Surgery",
      name: "pain_open_surgery",
      value: "pain_open_surgery",
    },
    {
      heading: "Pain Laparoscopic Surgery",
      name: "pain_laparoscopic_surgery",
      value: "pain_laparoscopic_surgery",
    },
    {
      heading: "Pain Robotic Surgery",
      name: "pain_robotic_surgery",
      value: "pain_robotic_surgery",
    },
    {
      heading: "Pain Past Six Months",
      name: "pain_past_six_months",
      value: "pain_past_six_months",
    },
    {
      heading: "Pain Interfered Relations",
      name: "pain_interfered_relations",
      value: "pain_interfered_relations",
    },
    {
      heading: "Pain Interfered Sleep",
      name: "pain_interfered_sleep",
      value: "pain_interfered_sleep",
    },
    { heading: "Height", name: "height", value: "height" },
    { heading: "Gender", name: "gender", value: "gender" },
    { heading: "Handness", name: "handness", value: "handness" },
    { heading: "Glove Size", name: "glove_size", value: "glove_size" },
    { heading: "User ID", name: "userid", value: "userid" },
    {
      heading: "Surgical Procedures per Day",
      name: "surgical_procedures_day",
      value: "surgical_procedures_day",
    },
    { heading: "Exercise", name: "exercise", value: "exercise" },
    {
      heading: "Primary Speciality",
      name: "primary_speciality",
      value: "primary_speciality",
    },
    {
      heading: "Years Open Surgery",
      name: "years_open_surgery",
      value: "years_open_surgery",
    },
    {
      heading: "Years Laparoscopic Surgery",
      name: "years_laparoscopic_surgery",
      value: "years_laparoscopic_surgery",
    },
    {
      heading: "Years Robotic Surgery",
      name: "years_robotic_surgery",
      value: "years_robotic_surgery",
    },
    {
      heading: "Most Common Procedures A",
      name: "most_common_procedures_a",
      value: "most_common_procedures_a",
    },
    {
      heading: "Most Common Procedures B",
      name: "most_common_procedures_b",
      value: "most_common_procedures_b",
    },
    {
      heading: "Most Common Procedures C",
      name: "most_common_procedures_c",
      value: "most_common_procedures_c",
    },
    { heading: "Created At", name: "createdAt", value: "createdAt" },
    { heading: "Updated At", name: "updatedAt", value: "updatedAt" },
  ];

  const eodColumn = [
    { heading: "User ID", name: "userid", value: "userid" },
    { heading: "Day", name: "day", value: "day" },
    { heading: "Time", name: "createdAt", value: "createdAt" },
    {
      heading: "Complex Surgeries",
      name: "complex_surgeries",
      value: "complex_surgeries",
    },
    {
      heading: "Difficult Surgeries",
      name: "difficult_surgeries",
      value: "difficult_surgeries",
    },
    { heading: "Distracting", name: "distracting", value: "distracting" },
    { heading: "Flow Impact", name: "flow_impact", value: "flow_impact" },
    { heading: "ID", name: "id", value: "id" },
    {
      heading: "Impact Fatigue",
      name: "impact_fatigue",
      value: "impact_fatigue",
    },
    { heading: "Comment", name: "comment", value: "comment" },
    { heading: "Impact Mental", name: "impact_mental", value: "impact_mental" },
    { heading: "Impact Pain", name: "impact_pain", value: "impact_pain" },
    {
      heading: "Impact Physical",
      name: "impact_physical",
      value: "impact_physical",
    },
    {
      heading: "Mentally Demanding Surgeries",
      name: "mentaly_demanding_surgeries",
      value: "mentaly_demanding_surgeries",
    },
    {
      heading: "Physically Demanding Surgeries",
      name: "physically_demanding_surgeries",
      value: "physically_demanding_surgeries",
    },
    { heading: "Updated At", name: "updatedAt", value: "updatedAt" },
  ];
  const generateInitialSearchInput = (columns) => {
    const initialSearchInput = {};
    columns.forEach((column) => {
      initialSearchInput[column.name] = "";
    });
    return initialSearchInput;
  };
  const initialBaselineSearchInput = generateInitialSearchInput(baselineColumn);
  const initialEodSearchInput = generateInitialSearchInput(eodColumn);

  const [searchInput, setSearchInput] = useState(
    selectedSurveyType === "baseline"
      ? initialBaselineSearchInput
      : initialEodSearchInput
  );

  const getShowingEntriesMessage = () => {
    if (selectedSurveyType === "baseline" ? baselineSurveys : eodSurveys) {
      const startIndex = (currentPage - 1) * entriesPerPage + 1;
      const endIndex = Math.min(currentPage * entriesPerPage, totalEntries);
      return `Showing ${startIndex} to ${entriesPerPage} of ${totalEntries} entries`;
    }

    return "";
  };
  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    // setCurrentPage(1);
  };

  const getCustomSurveys = async () => {
    try {
      // console.log(user?.token, "jjjj");
      if (user?.token) {
        const customSurveys = await getAllCustomSurveys(user?.token);
        console.log(customSurveys);
        setCustomSurveys(customSurveys?.surveys);
      }
    } catch (error) {
      throw error;
    }
  };
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      setLoading(true);
      const debounceTimer = setTimeout(() => {
        setDebouncedValue(value);
        setLoading(false);
      }, delay);

      return () => {
        clearTimeout(debounceTimer);
      };
    }, [value, delay]);

    return debouncedValue;
  };
  const debouncingDelay = 3000;
  const debouncedSearchInput = useDebounce(searchInput, debouncingDelay);
  const updateSearchInput = (name, value) => {
    setSearchInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSurveyToBedeleted = (id) => {
    console.log(id);
    setSurveyIdToBeDeleted(id);
    setModal("prompt");
  };
  const exportIds =
    selectedSurveyType === "baseline"
      ? baselineSurveys?.map((data) => data.id)
      : eodSurveys?.map((data) => data.id);
  const handleExports = async () => {
    const surveyType =
      selectedSurveyType === "baseline" ? "baselinesurvey" : "endofdaysurvey";
    const endpoint = `/${surveyType}/export?ids=[${exportIds}]`;
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
  const fetchBaselineSurveys = async () => {
    try {
      // console.log(user?.token);
      // console.log(user);
      setLoading(true);
      // const {
      //   days_per_week,
      //   age,
      //   pain_open_surgery,
      //   pain_laparoscopic_surgery,
      //   pain_robotic_surgery,
      //   pain_past_six_months,
      //   pain_interfered_relations,
      //   pain_interfered_sleep,
      //   height,
      //   gender,
      //   handness,
      //   glove_size,
      //   userid,
      //   surgical_procedures_day,
      //   exercise,
      //   primary_speciality,
      //   years_open_surgery,
      //   years_laparoscopic_surgery,
      //   years_robotic_surgery,
      //   most_common_procedures_a,
      //   most_common_procedures_b,
      //   most_common_procedures_c,
      //   createdAt,
      //   updatedAt,
      // } = debouncedSearchInput;
      if (user && user?.token) {
        const baselineSurveys = await getBaselineSurveys(
          user?.token,
          currentPage,
          entriesPerPage,
          debouncedSearchInput?.days_per_week || "",
          debouncedSearchInput?.age || "",
          debouncedSearchInput?.pain_open_surgery || "",
          debouncedSearchInput?.pain_laparoscopic_surgery || "",
          debouncedSearchInput?.pain_robotic_surgery || "",
          debouncedSearchInput?.pain_past_six_months || "",
          debouncedSearchInput?.pain_interfered_relations || "",
          debouncedSearchInput?.pain_interfered_sleep || "",
          debouncedSearchInput?.height || "",
          debouncedSearchInput?.gender || "",
          debouncedSearchInput?.handness || "",
          debouncedSearchInput?.glove_size || "",
          debouncedSearchInput?.surgical_procedures_day || "" || "",
          debouncedSearchInput?.exercise || "",
          debouncedSearchInput?.primary_speciality || "",
          debouncedSearchInput?.years_open_surgery || "",
          debouncedSearchInput?.years_laparoscopic_surgery || "",
          debouncedSearchInput?.years_robotic_surgery || "",
          debouncedSearchInput?.most_common_procedures_a || "",
          debouncedSearchInput?.most_common_procedures_b || "",
          debouncedSearchInput?.most_common_procedures_c || "",
          debouncedSearchInput?.createdAt || "",
          debouncedSearchInput?.updatedAt || ""
        );
        setLoading(false);

        setBaselineSurveys(baselineSurveys?.baselineSurveys);
        const totalBaseline = baselineSurveys?.totalNoOfSurveys;
        setTotalEntries(baselineSurveys?.totalNoOfSurveys);
        const calculatedPageCount = Math.ceil(totalBaseline / entriesPerPage);
        setPageCount(calculatedPageCount);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleDeleteSurvey = async () => {
    try {
      const deletedSurvey = await deleteCustomSurvey(
        surveyidToBeDeleted,
        user?.token
      );
      await getCustomSurveys();
      toast.success(deletedSurvey?.message);
      setModal("");
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  };

  const fetchEodSurveys = async () => {
    try {
      setLoading(true);
      // console.log(user.token, "kfkfk");
      const {
        userid,
        day,
        createdAt,
        complex_surgeries,
        difficult_surgeries,
        distracting,
        flow_impact,
        id,
        impact_fatigue,
        impact_mental,
        impact_pain,
        impact_physical,
        mentaly_demanding_surgeries,
        physically_demanding_surgeries,
        updatedAt,
      } = debouncedSearchInput;
      if (user && user?.token) {
        const eodSurveys = await getEodSurveys(
          user?.token,
          currentPage,
          entriesPerPage,
          userid,
          day,
          createdAt,
          complex_surgeries,
          difficult_surgeries,
          distracting,
          flow_impact,
          id,
          impact_fatigue,
          impact_mental,
          impact_pain,
          impact_physical,
          mentaly_demanding_surgeries,
          physically_demanding_surgeries,
          updatedAt
        );
        // console.log(userid);
        setLoading(false);
        // console.log(eodSurveys);
        setEodSurveys(eodSurveys?.endOfDaySurveys);
        setTotalEntries(eodSurveys?.totalNoOfSurveys);

        const totalEods = eodSurveys?.totalNoOfSurveys;
        const calculatedPageCount = Math.ceil(totalEods / entriesPerPage);
        setPageCount(calculatedPageCount);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleGoBack = () => {
    setShowSurveyTypeSelection(true);
    setSelectedSurveyType(null);
    setCurrentPage(1);
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
  }, [currentPage, entriesPerPage, debouncedSearchInput]);

  useEffect(() => {
    fetchBaselineSurveys();
  }, [debouncedSearchInput, entriesPerPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchInput]);
  useEffect(() => {
    if (baselineSurveys || eodSurveys) {
      const totalUsers = totalEntries;
      const maxOptions = Math.min(totalUsers, 10);
      const newOptions = Array.from(
        { length: maxOptions },
        (_, index) => (index + 1) * 10
      );
      setSelectOptions(newOptions);

      setAvailableOptions(newOptions);
    }
  }, [baselineSurveys || eodSurveys, entriesPerPage]);
  useEffect(() => {
    getCustomSurveys();
  }, [user?.token]);
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
        {showSurveyTypeSelection && (
          <Button
            click={() => navigate("/dashboard/create-survey")}
            textContent={"Create Survey"}
          />
        )}
      </header>
      {!showSurveyTypeSelection && (
        <div>
          <div className={style.entriesBox}>
            <label>Show entries: </label>
            <select
              value={entriesPerPage}
              onChange={handleEntriesPerPageChange}
            >
              {selectOptions?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <Button click={handleExports} textContent={"export Surveys"} />
        </div>
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
        {showSurveyTypeSelection && (
          <div className={style.custom_surveys_container}>
            <h1>Custom Surveys</h1>

            <div className={style.custom_surveys}>
              {customSurveys?.length > 0 ? (
                customSurveys?.map((survey) => (
                  <SurveyBox
                    key={survey?.id}
                    survey={survey}
                    edit={() =>
                      navigate(`/dashboard/survey-data/edit/${survey?.id}`)
                    }
                    deleteSurvey={() => handleSurveyToBedeleted(survey?.id)}
                  />
                ))
              ) : (
                <div className={style.no_custom_survey}>
                  <h1>There are currently No Custom Surveys</h1>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={style.surveyTableWrapper}>
          {loading && !showSurveyTypeSelection && <Loader />}
          {!showSurveyTypeSelection && (
            <Table
              showFilter
              loading={loading}
              searchInput={searchInput}
              updateSearchInput={updateSearchInput}
              column={
                selectedSurveyType === "baseline" ? baselineColumn : eodColumn
              }
              data={
                selectedSurveyType === "baseline" ? baselineSurveys : eodSurveys
              }
            />
          )}

          {!showSurveyTypeSelection && (
            <div className={style.surveyFooter}>
              <div className={style.showingEntriesMessage}>
                {getShowingEntriesMessage()}
              </div>
              <div className={style.paginationButtons}>
                <Pagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      {modal === "prompt" && (
        <DeletePrompt
          text={"Survey"}
          proceed={handleDeleteSurvey}
          cancel={() => setModal("")}
        />
      )}
    </div>
  );
}

export default SurveyData;
