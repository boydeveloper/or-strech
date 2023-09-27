import style from "./managevideos.module.css";

function ManageVideos() {
  return (
    <div className={style.ManageVideosWrapper}>
      <header>
        <h1> OR-Stretch | Back Office | Video Librarys</h1>
      </header>

      <div className={style.addVideoCta}>
        <button>ADD VIDEO</button>
      </div>

      <div className={style.videoBox}>
        <img src="/assets/imgs/cake.jpg" alt="cake" />
        <div className={style.videoBoxDetails}>
          <h1>Video name 2</h1>
          <span>linkkdkjkd</span>
          <span>date</span>
          <button>UPDATE VIDEO</button>
          <button>DELETE VIDEO</button>
        </div>
      </div>
    </div>
  );
}

export default ManageVideos;
