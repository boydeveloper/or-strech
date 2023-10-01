import { useEffect, useState } from "react";
import style from "./managetags.module.css";
import {
  createTag,
  getAllTags,
  deleteTag,
} from "../../../../Apis/tags/tagsService";
import Table from "../../components/table/table";
import toast from "react-hot-toast";
import DeletePrompt from "../../components/deletePrompt/deletePrompt";

function ManageTags() {
  const [tags, setTags] = useState(null);
  const [tagToBeDelelted, setTagToBeDeleted] = useState("");
  const [modal, setModal] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    baseline: 1,
  });

  const tagColumns = [
    { heading: "ID", value: "id" },
    { heading: "Tag Name", value: "name" },
    { heading: "created", value: "createdAt" },
    { heading: "Baseline", value: "baseline" },
    { heading: "Update", value: "update" },
    { heading: "Delete", value: "delete" },
    { heading: "Recently Updated", value: "updatedAt" },
  ];

  const getTags = async () => {
    const allTags = await getAllTags();
    const sortTagsByRecent = allTags.tags.sort(
      (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
    );
    setTags(sortTagsByRecent);
    console.log(sortTagsByRecent);
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const baseSurveyValue = type === "checkbox" ? (checked ? 1 : 0) : value;
    setFormData({
      ...formData,
      [name]: baseSurveyValue,
    });
  };
  const handleTagToBeDelelted = (name) => {
    setTagToBeDeleted(name);
    setModal("prompt");
  };

  const handleDeleteTag = async () => {
    try {
      console.log(tagToBeDelelted);
      const deletingTag = await deleteTag(tagToBeDelelted);
      console.log(deletingTag);
      setModal("");
      if (deletingTag?.isSuccess === true) {
        toast.success(deletingTag?.message);
        getTags();
      } else if (deletingTag?.message.sql) {
        throw new Error("Old tags, cant be deleted yet!");
      } else {
        console.log("hiii");
        toast.error(deletingTag?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      const tagCreating = await createTag(formData);
      console.log(tagCreating);
      getTags();
      if (tagCreating.isSuccess === true) {
        toast.success(`${tagCreating.tag.name} Tag Created`);
      } else {
        toast.error(tagCreating.message);
      }

      setFormData({
        name: "",
        baseline: 0,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={style.manageTagsWrapper}>
      <header>
        <h1>OR-Stretch | Back Office | Manage Tags</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Add New Tag</h1>
        <div>
          <input
            type="text"
            name="name"
            required
            placeholder="Tag Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </div>
        <label htmlFor="baseline" className={style.baseline}>
          <input
            type="checkbox"
            id="baseline"
            name="baseline"
            checked={formData.baseline === 1}
            onChange={handleInputChange}
          />
          Baseline?
        </label>
      </form>
      <div>
        <Table
          column={tagColumns}
          data={tags && tags}
          tag
          handleDelete={handleTagToBeDelelted}
        />
      </div>
      {modal === "prompt" && (
        <DeletePrompt
          text={"tag"}
          proceed={handleDeleteTag}
          cancel={() => setModal("")}
        />
      )}
    </div>
  );
}

export default ManageTags;
