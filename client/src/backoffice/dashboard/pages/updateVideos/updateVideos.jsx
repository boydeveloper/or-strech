import { useEffect, useState } from "react";
import style from "./updatevideos.module.css";
import { useAuth } from "../../../context/auth";
import {
  getLinkDetails,
  updateVideoLink,
} from "../../../../Apis/video/videoService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function UpdateVideos() {
  const { linkName } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    media_type: "2",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchVideoDetails = async () => {
    const details = await getLinkDetails(linkName, user?.token);
    console.log(details);
    setFormData({
      name: details?.link?.name,
      url: details?.link?.url,
      media_type: details?.link?.type === "video" ? "1" : "2",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateVideo = await updateVideoLink(
        formData,
        linkName,
        user?.token
      );
      if (updateVideo?.isSuccess === true) {
        toast.success(`Video with name ${linkName} updated`);
        navigate("/dashboard/manage-videos");
      } else {
        toast.error(updateVideo?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [user]);

  return (
    <div className={style.updateVideosWrapper}>
      <header>
        <h1>Back Office | Update Media</h1>
      </header>

      <div className={style.updateVideoMain}>
        <h1>Update Media</h1>
        <form onSubmit={handleUpdate}>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <span>Media Name</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
            <span>URL</span>
          </label>
          <label className={style.inputContainer}>
            <span>Media Type</span>
            <div className={style.customSelect}>
              <select
                name="media_type"
                value={formData.media_type}
                onChange={handleInputChange}
              >
                <option value="2">Link</option>
                <option value="1">Video</option>
              </select>
              <span className={style.selectArrow}></span>
            </div>
          </label>
          <div className={style.addVideosCta}>
            <button onClick={() => navigate("/dashboard/manage-videos")}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateVideos;
