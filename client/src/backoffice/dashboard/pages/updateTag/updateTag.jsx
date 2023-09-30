import { useNavigate, useParams } from "react-router-dom";
import style from "./updatetag.module.css";
import { getAllTags, updateTag } from "../../../../Apis/tags/tagsService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UpdateTag() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tagToBeUpdated, setTagToBeUpdated] = useState(null);
  const [tagData, setTagData] = useState({
    baseline_survey: 1,
    name: "",
  });

  const getTags = async () => {
    const allTags = await getAllTags();

    const aboutToBeUpdatedTag = allTags?.tags.find(
      (tag) => tag.id === Number(id)
    );

    setTagToBeUpdated(aboutToBeUpdatedTag);
    console.log(aboutToBeUpdatedTag);
    setTagData({
      name: aboutToBeUpdatedTag?.name,
      baseline_survey: aboutToBeUpdatedTag?.baseline,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTag = await updateTag(tagData, tagToBeUpdated.name);

      await toast.success(updatedTag.message);
      navigate("/dashboard/manage-tags");
    } catch (error) {
      toast.error(message);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTagData({ ...tagData, [name]: value });
  };

  return (
    <div className={style.updateTagWrapper}>
      <header className={style.updateTagHeader}>
        <h1>OR-Stretch | Back Office | Manage Tags</h1>
      </header>

      <form onSubmit={handleSubmit} className={style.updateTagMain}>
        <label className={style.inputContainer}>
          <input
            type="number"
            name="baseline"
            readOnly
            value={tagData.baseline_survey}
            onChange={handleChange}
          />
          <span>Baseline</span>
        </label>
        <label className={style.inputContainer}>
          <input
            type="text"
            name="name"
            value={tagData.name}
            onChange={handleChange}
          />
          <span>Tag Name</span>
        </label>
        <div className={style.updateTagCta}>
          <button>Cancel</button>
          <button>Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTag;
