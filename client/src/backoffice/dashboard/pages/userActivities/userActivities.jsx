import style from "./useractivities.module.css";
import { Button, Pagination, Table } from "../../components/index";
import { useEffect, useState } from "react";
import {
  getExports,
  getUserActivities,
} from "../../../../Apis/users/userService";
import Loader from "../../../../components/Loader";
import { useAuth } from "../../../context/auth";

function UserActivities() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const tableColumn = [
    { heading: "User ID", value: "userId" },
    { heading: "Event Name", value: "event_type" },
    { heading: "Event Date", value: "createdAt" },
  ];
  const getActivities = async () => {
    try {
      setLoading(true);
      const activities = await getUserActivities(
        currentPage,
        usersPerPage,
        user?.token
      );
      setLoading(false);
      console.log(activities);
      setEvents(activities.events);
      const totalEvents = activities.totalNoOfEvents;
      const calculatedPageCount = Math.ceil(totalEvents / usersPerPage);
      setPageCount(calculatedPageCount);
    } catch (error) {
      throw error;
    }
  };
  const handleExports = async () => {
    try {
      await getExports("/events/export", user?.token, "User Activities");
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getActivities();
  }, [currentPage]);
  return (
    <div className={style.activitiesOverview}>
      <header className={style.userActivitiesHeader}>
        <h1>Back Office | Users Activities</h1>
      </header>

      <Button click={handleExports} textContent={"export activities"} />
      <div className={style.tableWrapper}>
        {loading ? (
          <div className={style.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <>
            <Table
              column={tableColumn && tableColumn}
              data={
                events?.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                ) || []
              }
            />
          </>
        )}
        <div className={style.paginationButtons}>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default UserActivities;
