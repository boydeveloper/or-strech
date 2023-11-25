import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
import { Piechart } from "../../../../frontend/utils/svg";
function Sidebar() {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__links}>
        <Link to={"users"}>
          <i className="glyph-icon simple-icon-people"></i>
          <p>Manage Users </p>
        </Link>
        <Link to={"manage-tags"}>
          <i className="simple-icon-tag"></i>
          <p> Manage Tags </p>
        </Link>
        <Link to={"manage-videos"}>
          <i className="simple-icon-social-youtube"></i>
          <p> Manage Media</p>
        </Link>
        <Link to={"users-activities"}>
          <i className="simple-icon-layers"></i>

          <p> Users Activity</p>
        </Link>
        <Link to={"survey-data"}>
          <Piechart />
          <p> Survey Data</p>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
