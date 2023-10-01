import React, { useEffect, useState } from "react";
import style from "./updateUser.module.css";
import { getAllUsers, updateUser } from "../../../../Apis/users/userService";
import { Switch } from "../../components/index";
import { getAllTags } from "../../../../Apis/tags/tagsService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [userEmailToBeUpdated, setUserEmailToBeUpdated] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    firstName: "",
    tags_excel: [],
    lastName: "",
    userType: "",
  });

  const [selectedTags, setSelectedTags] = useState({});

  const getTags = async () => {
    const tags = await getAllTags();
    setTags(tags?.tags);
    console.log(tags.tags);
  };

  const fetchUsers = async () => {
    const users = await getAllUsers();
    const userToBeUpdated = users.find((user) => user.id === Number(id));
    setUserEmailToBeUpdated(userToBeUpdated.email);
    console.log(userToBeUpdated);
    if (userToBeUpdated) {
      setFormData({
        email: userToBeUpdated.email,
        name: userToBeUpdated.name,
        firstName: userToBeUpdated.firstName,
        lastName: userToBeUpdated.lastName,
        userType: userToBeUpdated.userType,
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
  }, []);

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
        userEmailToBeUpdated
      );

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
        <h1>OR-Stretch | Back Office | Update User</h1>
      </header>
      <div className={style.updateUserMain}>
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          <label className={style.inputContainer}>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <span>E-mail</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <span>First Name</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <span>Name</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <span>Last Name</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
            />
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
            <button>Cancel</button>
            <button type="submit">Update User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
