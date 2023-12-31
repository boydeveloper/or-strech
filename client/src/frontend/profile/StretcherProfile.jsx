import { useState, useEffect } from "react";
import Header from "../components/header/header";
import style from "./stretcherprofile.module.css";
import { getUserDetails, updateUser } from "../../Apis/users/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

function StretcherProfile() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userJSON = sessionStorage.getItem("strecher");
  const user = JSON.parse(userJSON);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const getProfileUser = async () => {
    const profileUser = await getUserDetails(user?.email, user?.token);
    console.log(profileUser);

    setProfileData({
      name: profileUser?.user?.name,
      email: profileUser?.user?.email,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const update = await updateUser(
        { userid: user?.id, ...profileData },
        user?.email,
        user?.token
      );
      if (update?.isSuccess === true) {
        setIsLoading(false);
        toast.success(update?.message);
        navigate("/stretch");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  useEffect(() => {
    getProfileUser();
  }, []);

  return (
    <div className={style.StretcherProfileWrapper}>
      <Navbar />
      <div className={style.StretcherProfileMain}>
        <form onSubmit={handleSave} className={style.profile_box}>
          <h2 className={style.profile_title}>Update Profile</h2>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
            />
            <span>Name</span>
          </label>

          <label className={style.inputContainer}>
            <input
              type="email"
              name="email"
              required
              readOnly
              value={profileData.email}
              onChange={handleInputChange}
            />
            <span>Email</span>
          </label>
          <button className={style.profile_save__button} type="submit">
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StretcherProfile;
