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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      console.log(user.token);
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
        <h1>OR-Stretch | Back Office | Add New Video</h1>
      </header>

      <div className={style.addVideoMain}>
        <h1>Add New Video</h1>
        <form onSubmit={handleSubmit}>
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
