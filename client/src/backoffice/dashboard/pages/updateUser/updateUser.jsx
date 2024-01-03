import React, { useEffect, useState } from "react";
import style from "./updateUser.module.css";
import { getAllUsers, updateUser } from "../../../../Apis/users/userService";
import { Switch } from "../../components/index";
import { getAllTags } from "../../../../Apis/tags/tagsService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth";

function UpdateUser() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [userEmailToBeUpdated, setUserEmailToBeUpdated] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    tags_excel: [],
    user_type: "",
  });

  const [selectedTags, setSelectedTags] = useState({});

  const getTags = async () => {
    const tags = await getAllTags(user?.token);
    setTags(tags?.tags);
    console.log(tags.tags);
  };

  const fetchUsers = async () => {
    const users = await getAllUsers(user?.token);
    const userToBeUpdated = users.find((user) => user.id === Number(id));
    setUserEmailToBeUpdated(userToBeUpdated.email);
    console.log(userToBeUpdated);
    if (userToBeUpdated) {
      setFormData({
        email: userToBeUpdated.email,
        name: userToBeUpdated.name,
        user_type: userToBeUpdated.user_type,
      });
      const tagsExcelArray = JSON.parse(userToBeUpdated.tags_excel || "[]");
      const initialSelectedTags = {};
      tagsExcelArray.forEach((tag) => {
        initialSelectedTags[tag] = true;
      });
      setSelectedTags(initialSelectedTags);
    }
  };

  useEffect(() => {
    fetchUsers();
    getTags();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagSelect = (tagName) => {
    setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [tagName]: !prevSelectedTags[tagName],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTags = Object.keys(selectedTags).filter(
        (tagName) => selectedTags[tagName]
      );

      const formattedTagsString = `['${updatedTags.join("', '")}']`;
      const formattedTagsArray = JSON.parse(
        formattedTagsString.replace(/'/g, '"')
      );
      const updatedFormData = {
        ...formData,
        tags_excel: formattedTagsArray,
      };
      console.log(updatedFormData);
      const updatingUser = await updateUser(
        updatedFormData,
        userEmailToBeUpdated,
        user?.token
      );

      console.log(updatingUser);
      if (updatingUser.isSuccess === true) {
        toast.success(updatingUser.message);
        navigate("/dashboard/users");
      } else {
        toast.error(updatingUser.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={style.updateUserWrapper}>
      <header>
        <h1>Back Office | Update User</h1>
      </header>
      <div className={style.updateUserMain}>
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          <label className={style.inputContainer}>
            <input
              type="id"
              name="id"
              // required
              readOnly
              value={id}
              // onChange={handleInputChange}
            />
            <span>User ID</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="email"
              name="email"
              required
              readOnly
              value={formData.email}
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

          <div className={style.tagsWrapper}>
            <h1>Select User Tag(s)</h1>
            <div className={style.tagsWrapperBox}>
              {tags?.map((tag) => (
                <div key={tag.id} className={style.tagBox}>
                  <span>{tag.name}</span>
                  <Switch
                    key={tag.id}
                    value={tag.name}
                    checked={selectedTags[tag.name] || false}
                    onChange={() => handleTagSelect(tag.name)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={style.adduserCta}>
            <button onClick={() => navigate("/dashboard/users")}>Cancel</button>
            <button type="submit">Update User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
