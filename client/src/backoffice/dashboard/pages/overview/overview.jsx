import { useEffect, useState } from "react";
import { getUsers } from "../../../../Apis/users/userService";
import style from "./overview.module.css";

function Overview() {
  const [usersNum, setUsersNum] = useState(null);
  const fetchData = async () => {
    const dataUsers = await getUsers(1, 2);
    setUsersNum(dataUsers?.totalNoOfUsers);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={style.overviewWrapper}>
      <header className={style.overviewHeader}>
        <h1>OR-Stretch | Back Office</h1>
      </header>
      <main>
        <div className={style.overiewCards}>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <i class="iconsminds-clock mr-2 text-white align-text-bottom d-inline-block"></i>
              {/* <ion-icon name="alarm-outline"></ion-icon> */}
              <h1>30 minutes</h1>
              <p>
                Total stretch time this <br /> month
              </p>
            </div>
            <div className={style.progressBar}>
              <div className={style.progress}></div>
              0/12
            </div>
          </div>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <i class="iconsminds-male mr-2 text-white align-text-bottom d-inline-block"></i>
              <h1>{usersNum && usersNum} Users</h1>
              <p>Total number of users</p>
            </div>
            <div className={style.progressBar}>
              <div className={style.progress}></div>
              0/12
            </div>
          </div>
          <div className={style.overiewCard}>
            <div className={style.overiewCard__details}>
              <i class="iconsminds-bell mr-2 text-white align-text-bottom d-inline-block"></i>
              <h1>Temp</h1>
              <p>Place holder</p>
            </div>
            <div className={style.progressBar}>
              <div className={style.progress}></div>
              0/12
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Overview;
