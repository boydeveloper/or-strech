import React, { useEffect, useState } from "react";
import style from "./adduser.module.css";

import toast from "react-hot-toast";
import { createUser } from "../../../../Apis/users/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { Switch } from "../../components";
import { getAllTags } from "../../../../Apis/tags/tagsService";

function AddUser() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tags, setTags] = useState(null);
  const [selectedTags, setSelectedTags] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    user_type: "normal_user",
    tags_excel: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagSelect = (tagName) => {
    setSelectedTags((prevTags) => ({
      ...prevTags,
      [tagName]: !prevTags[tagName],
    }));
  };

  const getTags = async () => {
    const tags = await getAllTags(user?.token);
    setTags(tags?.tags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedTagNames = Object?.keys(selectedTags)?.filter(
      (tagName) => selectedTags[tagName]
    );
    const newFormdata = {
      ...formData,
      tags_excel: selectedTagNames,
    };
    console.log(newFormdata);
    try {
      console.log(newFormdata);
      const newUser = await createUser(newFormdata, user?.token);
      console.log(newUser);
      if (newUser?.isSuccess === true) {
        toast.success("User created sucessfully!");
        navigate("/dashboard/users");
      } else {
        toast.error(newUser.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getTags();
  }, []);
  return (
    <div className={style.addUsersWrapper}>
      <header>
        <h1>Back Office | Users</h1>
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
                <option value="normal_user">Stretcher</option>
                <option value="admin">Admin</option>
              </select>
              <span className={style.selectArrow}></span>
            </div>
            <span>User Type</span>
          </label>
          {/* <div className={style.tagsWrapper}>
            <h1>Select User Tag(s)</h1>
            <div className={style.tagsWrapperBox}>
              {tags?.map((tag) => (
                <div key={tag.id} className={style.tagBox}>
                  <span>{tag.name}</span>
                  <Switch
                    key={tag.id}
                    value={tag.name}
                    onChange={() => handleTagSelect(tag.name)}
                    checked={selectedTags[tag.name] || false}
                  />
                </div>
              ))}
            </div>
          </div> */}

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
