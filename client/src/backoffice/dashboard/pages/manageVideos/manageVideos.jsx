import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { useEffect, useState } from "react";
import {
  deleteVideoLink,
  getVideoLinks,
} from "../../../../Apis/video/videoService";
import style from "./managevideos.module.css";
import DeletePrompt from "../../components/deletePrompt/deletePrompt";
import toast from "react-hot-toast";

function ManageVideos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [modal, setModal] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [links, setLinks] = useState(null);

  const getLinks = async () => {
    const links = await getVideoLinks(user?.token);
    if (links?.isSuccess === true) {
      setLinks(links?.links);
    }
  };
  const handleDeleteVideo = async () => {
    try {
      const deleteV = await deleteVideoLink(selectedVideo, user?.token);
      if (deleteV.isSuccess === true) {
        console.log(deleteV);
        toast.success(deleteV.message);
        await getLinks();
        setModal("");
      } else {
        toast.error(deleteV.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  };
  useEffect(() => {
    getLinks();
  }, [user]);
  return (
    <div className={style.ManageVideosWrapper}>
      <header>
        <h1> OR-Stretch | Back Office | Video Librarys</h1>
      </header>

      <div className={style.addVideoCta}>
        <button onClick={() => navigate("/dashboard/add-videos")}>
          ADD VIDEO
        </button>
      </div>
      <div className={style.videosBox}>
        {links?.length === 0 ? (
          <div className={style.nouser}>
            <h1>Currently, No videos at the moment</h1>
          </div>
        ) : (
          links?.map((link) => (
            <div className={style.videoBox} key={link.name}>
              <img src="/assets/imgs/cake.jpg" alt="cake" />
              <div className={style.videoBoxDetails}>
                <h1>{link.name}</h1>
                <div className={style.cta}>
                  <Link to={`/dashboard/manage-videos/${link.name}`}>
                    <ion-icon name="create"></ion-icon>
                  </Link>
                  <button
                    onClick={() => {
                      setModal("prompt");
                      setSelectedVideo(link.name);
                    }}
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {modal === "prompt" && (
        <DeletePrompt
          text={"Video"}
          proceed={handleDeleteVideo}
          cancel={() => setModal("")}
        />
      )}
    </div>
  );
}

export default ManageVideos;
