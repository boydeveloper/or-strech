import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
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
          <p> Manage Videos</p>
        </Link>
        <Link>
          <i className="simple-icon-layers"></i>

          <p> Users Activity</p>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
