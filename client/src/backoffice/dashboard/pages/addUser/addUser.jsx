import React, { useState } from "react";
import style from "./adduser.module.css";

import toast from "react-hot-toast";
import { createUser } from "../../../../Apis/users/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";

function AddUser() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    user_type: "stretcher",
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
      const newUser = await createUser(formData, user?.token);
      console.log(newUser);
      if (newUser?.isSuccess === true) {
        toast.success(newUser?.message);
        navigate("/dashboard/users");
      } else {
        toast.error(newUser.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className={style.addUsersWrapper}>
      <header>
        <h1>OR-Stretch | Back Office | Users</h1>
      </header>
      <div className={style.addUserMain}>
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit}>
          <label className={style.inputContainer}>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleInputChange}
            />
            <span>E-mail</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <span>Full Name</span>
          </label>

          <label className={style.inputContainer}>
            <div className={style.customSelect}>
              <select
                name="user_type"
                value={formData.user_type}
                onChange={handleInputChange}
              >
                <option value="stretcher">Stretcher</option>
                <option value="admin">Admin</option>
              </select>
              <span className={style.selectArrow}></span>
            </div>
            <span>User Type</span>
          </label>

          <div className={style.adduserCta}>
            <button onClick={() => navigate("/dashboard/users")}>Cancel</button>
            <button type="submit">Add user</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
