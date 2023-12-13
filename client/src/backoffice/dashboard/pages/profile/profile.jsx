import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/fomatDate";
import style from "./profile.module.css";
import { getUserDetails, updateUser } from "../../../../Apis/users/userService";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth";

function Profile() {
  const { user } = useAuth();

  const [formdata, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    // user_type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getProfileUser = async () => {
    const profileUser = await getUserDetails(user?.email, user?.token);
    console.log(profileUser.user);
    console.log(profileUser.user.name);

    setFormData((prev) => ({
      ...prev,
      id: profileUser?.user?.id || "",
      name: profileUser?.user?.name || "",
      email: profileUser?.user?.email || "",
    }));
    console.log(formdata.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateAdminUser = await updateUser(
        formdata,
        user?.email,
        user?.token
      );
      if (updateAdminUser?.isSuccess === true) {
        console.log(updateAdminUser);
        toast.success(updateAdminUser?.message);
      } else {
        toast.success(updateAdminUser?.message);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getProfileUser();
  }, [user]);

  return (
    <div className={style.profileWrapper}>
      <header className={style.profileHeader}>
        <h1>Back Office | Profile</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className={style.profileMain}>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="id"
              required
              readOnly
              value={formdata.id}
            />
            <span>ID</span>
          </label>

          <label className={style.inputContainer}>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleInputChange}
            />
            <span>Full Name</span>
          </label>

          <label className={style.inputContainer}>
            <input
              type="email"
              name="email"
              readOnlyrequired
              value={formdata.email}
            />
            <span>Email</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="joined"
              required
              readOnly
              value={formatDate(user?.createdAt)}
            />
            <span>Joined</span>
          </label>

          <div className={style.profileCta}>
            <button onClick={() => navigate("/dashboard/overview")}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
