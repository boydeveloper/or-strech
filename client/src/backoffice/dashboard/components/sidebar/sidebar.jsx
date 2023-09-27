import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
function Sidebar() {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__links}>
        <Link to={"/backoffice/dashboard/users"}>
          <i class="glyph-icon simple-icon-people"></i>
          <p>Manage Users </p>
        </Link>
        <Link to={"manage-tags"}>
          <i class="simple-icon-tag"></i>
          <p> Manage Tags </p>
        </Link>
        <Link to={"manage-videos"}>
          <i class="simple-icon-social-youtube"></i>
          <p> Manage Videos</p>
        </Link>
        <Link>
          <i class="simple-icon-layers"></i>

          <p> Users Activity</p>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
