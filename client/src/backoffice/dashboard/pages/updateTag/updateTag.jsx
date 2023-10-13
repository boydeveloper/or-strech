import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllTags, updateTag } from "../../../../Apis/tags/tagsService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import style from "./updatetag.module.css";
import { Switch } from "../../components";
import { useAuth } from "../../../context/auth";

function UpdateTag() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tagToBeUpdated, setTagToBeUpdated] = useState(null);

  const [tagData, setTagData] = useState({
    baseline: null,
    name: "",
  });

  const getTags = async () => {
    const allTags = await getAllTags(user?.token);

    const aboutToBeUpdatedTag = allTags?.tags.find(
      (tag) => tag.id === Number(id)
    );

    setTagToBeUpdated(aboutToBeUpdatedTag);
    console.log(aboutToBeUpdatedTag);
    setTagData({
      name: aboutToBeUpdatedTag?.name,
      baseline: aboutToBeUpdatedTag?.baseline,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatingTag = await updateTag(
        tagData,
        tagToBeUpdated.name,
        user?.token
      );
      if (updatingTag.isSuccess === true) {
        toast.success(updatingTag.message);
        navigate("/dashboard/manage-tags");
      } else {
        toast.error(updatingTag.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getTags();
  }, [user]);
  const handleBaselineChange = (newValue) => {
    setTagData({
      ...tagData,
      baseline: !tagData.baseline,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTagData({ ...tagData, [name]: value });
  };

  return (
    <div className={style.updateTagWrapper}>
      <header className={style.updateTagHeader}>
        <h1>Back Office | Manage Tags</h1>
      </header>

      <form onSubmit={handleSubmit} className={style.updateTagMain}>
        <label className={style.inputContainer}>
          <input
            type="text"
            name="name"
            required
            placeholder="your new tag name"
            value={id}
            readOnly
            onChange={handleChange}
          />
          <span>ID</span>
        </label>
        <label className={style.inputContainer}>
          <input
            type="text"
            name="name"
            required
            placeholder="your new tag name"
            value={tagData?.name}
            onChange={handleChange}
          />
          <span>Tag Name</span>
        </label>

        <div className={style.updateTagCta}>
          <Link to="/dashboard/manage-tags">Back</Link>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTag;
