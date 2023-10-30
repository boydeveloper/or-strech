import { useState } from "react";
import style from "./addvideos.module.css";
import { addVideoLink } from "../../../../Apis/video/videoService";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddVideos() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    media_type: "1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserTypeChange = (e) => {
    const userTypeValue = e.target.value;

    const mediaTypeValue = userTypeValue === "admin" ? "1" : "2";
    setFormData({
      ...formData,
      media_type: mediaTypeValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const addVideo = await addVideoLink(formData, user?.token);
      console.log(addVideo);
      if (addVideo?.isSuccess === true) {
        toast.success("Video added!");
        navigate("/dashboard/manage-videos");
      } else {
        toast.error(addVideo?.message);
      }
      console.log("Form Data Submitted:", formData);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={style.addVideosWrapper}>
      <header>
        <h1>Back Office | Add New Media</h1>
      </header>

      <div className={style.addVideoMain}>
        <h1>Add New Media</h1>
        <form onSubmit={handleSubmit}>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <span>Media Name</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              required
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
            <span>URL</span>
          </label>
          <label className={style.inputContainer}>
            <span>User Type</span>
            <div className={style.customSelect}>
              <select
                name="user_type"
                value={formData.user_type}
                onChange={handleUserTypeChange}
              >
                <option value="2">Video</option>
                <option value="1">Link</option>
              </select>
              <span className={style.selectArrow}></span>
            </div>
          </label>

          <div className={style.addVideosCta}>
            <button onClick={() => navigate("/dashboard/manage-videos")}>
              Cancel
            </button>
            <button type="submit">Add user</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVideos;
