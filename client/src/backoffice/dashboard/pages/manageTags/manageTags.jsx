import { useEffect, useState } from "react";
import style from "./managetags.module.css";
import {
  createTag,
  getAllTags,
  deleteTag,
  getTags,
} from "../../../../Apis/tags/tagsService";
import Table from "../../components/table/table";
import toast from "react-hot-toast";
import DeletePrompt from "../../components/deletePrompt/deletePrompt";
import Loader from "../../../../components/Loader";
import { useAuth } from "../../../context/auth";
import { getExports } from "../../../../Apis/users/userService";
import { Button } from "../../components";
import { SearchIcon } from "../../../../frontend/utils/svg";

function ManageTags() {
  const { user } = useAuth();
  const [tags, setTags] = useState(null);
  const [tagToBeDelelted, setTagToBeDeleted] = useState("");
  const [loading, setLoading] = useState(false);
  const [createTagPending, setCreateTagPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [modal, setModal] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    baseline: 0,
  });

  const tagColumns = [
    { heading: "Tag Name", value: "name" },
    { heading: "created", value: "createdAt" },
    { heading: "Update", value: "update" },
    { heading: "Delete", value: "delete" },
  ];

  const fetchTags = async () => {
    setLoading(true);
    const allTags = await getTags(1, searchInput, user?.token);
    console.log(allTags);
    setLoading(false);
    const sortTagsByRecent = allTags.tags.sort(
      (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
    );
    setTags(sortTagsByRecent);
    console.log(sortTagsByRecent);
  };

  useEffect(() => {
    fetchTags();
  }, [searchInput, user]);

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
  const availableExports = tags?.map((tag) => tag.id);
  const handleExports = async (ids) => {
    await getExports(
      `/tags/export?ids=[${availableExports}]`,
      user?.token,
      "Tags"
    );
  };

  const handleDeleteTag = async () => {
    try {
      console.log(tagToBeDelelted);
      const deletingTag = await deleteTag(tagToBeDelelted, user?.token);
      console.log(deletingTag);
      setModal("");
      if (deletingTag?.isSuccess === true) {
        toast.success(deletingTag?.message);
        fetchTags();
      } else if (deletingTag?.message.sql) {
        throw new Error("Old tags, cant be deleted yet!");
      } else {
        toast.error(deletingTag?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setCreateTagPending(true);
      const tagCreating = await createTag(formData, user?.token);
      if (tagCreating.isSuccess === true) {
        setCreateTagPending(false);
        toast.success(`${tagCreating.tag.name} Tag Created`);
        fetchTags();
      } else {
        setCreateTagPending(false);
        toast.error(tagCreating.message);
      }
      setFormData({
        name: "",
        baseline: 0,
      });
    } catch (error) {
      setCreateTagPending(false);
      throw error;
    }
  };

  return (
    <div className={style.manageTagsWrapper}>
      <header>
        <h1>Back Office | Manage Tags</h1>
      </header>

      <Button textContent={"export tags"} click={handleExports} />
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
          <button disabled={createTagPending} type="submit">
            {createTagPending ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
      <div>
        <div className={style.searchContainer}>
          <div className={style.searchIcon}>
            <SearchIcon />
            {/* <ion-icon name="search"></ion-icon> */}
          </div>
          <input
            type="text"
            placeholder="Search tags"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {loading ? (
          <div className={style.loaderContainer}>
            <Loader />
          </div>
        ) : tags?.length === 0 ? (
          <div className={style.notag}>
            <h1>No Tag matches the search</h1>
          </div>
        ) : (
          <Table
            column={tagColumns}
            data={tags || []}
            tag
            loading={loading}
            handleDelete={handleTagToBeDelelted}
          />
        )}
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
