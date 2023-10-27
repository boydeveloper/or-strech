import { useEffect, useState } from "react";
import { getAllUsers, getUsers } from "../../../../Apis/users/userService";
import style from "./overview.module.css";
import { Link } from "react-router-dom";
import { getRecentLogin } from "../../../../Apis/event/eventService";
import Table from "../../components/table/table";
import { useAuth } from "../../../context/auth";
import { getAllTags, getTags } from "../../../../Apis/tags/tagsService";

function Overview() {
  const { user } = useAuth();
  const [usersNum, setUsersNum] = useState(null);
  const [totalTags, setTotalTags] = useState(null);
  const [totalLogins, setTotalLogins] = useState(null);
  const [logins, setLogins] = useState(null);
  const tableColumn = [
    { heading: "UserID", value: "userId" },
    { heading: "Login Type", value: "event_type" },
    { heading: "Time", value: "createdAt" },
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayName = dayNames[dayOfWeek];

  const fetchData = async () => {
    try {
      const dataUsers = await getUsers(
        1,
        2,
        user?.token,
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      );

      const tag = await getAllTags(user?.token);
      setTotalTags(tag?.totalNoOfTags);
      const loggedInActivities = await getRecentLogin(user?.token);
      const login = loggedInActivities?.login_events?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setLogins(login);
      setUsersNum(dataUsers?.totalNoOfUsers);
      const currentDate = new Date().toISOString().slice(0, 10);
      const loginEventsToday = login?.filter((event) => {
        const createdAtDate = new Date(event.createdAt)
          .toISOString()
          .slice(0, 10);
        return createdAtDate === currentDate;
      });

      const loginCountToday = loginEventsToday?.length;
      setTotalLogins(loginCountToday);
    } catch (error) {
      throw error;
    }
  };

  console.log(logins);
  useEffect(() => {
    fetchData();
  }, [user]);
  return (
    <div className={style.overviewWrapper}>
      <header className={style.overviewHeader}>
        <h1>OR-Stretch | Back Office</h1>
      </header>
      <main>
        <div className={style.overiewCards}>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <i className="iconsminds-clock mr-2 text-white align-text-bottom d-inline-block"></i>
              <h1>{totalLogins} Login(s) today</h1>
              <p>Total number of logins today.</p>
            </div>
          </div>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <i className="iconsminds-male mr-2 text-white align-text-bottom d-inline-block"></i>
              <h1>{usersNum && usersNum} Users</h1>
              <p>Total number of users</p>
            </div>
          </div>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <ion-icon name="pricetag-outline"></ion-icon>
              <h1>{totalTags} Tags</h1>
              <p>Total number of tags</p>
            </div>
          </div>
        </div>
        <div className={style.tableWrapper}>
          <h1>Recent User Sign-Ins</h1>
          <Table column={tableColumn} data={logins} />
        </div>
      </main>
    </div>
  );
}

export default Overview;
