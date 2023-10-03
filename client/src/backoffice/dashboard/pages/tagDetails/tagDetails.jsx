import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllTags } from "../../../../Apis/tags/tagsService";
import style from "./tagDetails.module.css";
import { formatDate } from "../../../utils/fomatDate";

function TagDetails() {
  const { name } = useParams();
  const [tag, setTag] = useState("");
  const getTag = async () => {
    const allTags = await getAllTags();
    console.log(name);
    const tagToBePreviewed = allTags?.tags.find((tag) => tag.name === name);
    console.log(tagToBePreviewed);
    setTag(tagToBePreviewed);
    console.log(tag);
  };
  useEffect(() => {
    getTag();
  }, []);
  return (
    <div className={style.tagDetailsWrapper}>
      <header>
        <h1>OR-Stretch | Back Office | Manage Tags | {tag?.name}</h1>
      </header>

      <div className={style.tagMain}>
        <Link to={"/dashboard/manage-tags"}>
          <ion-icon name="arrow-back"></ion-icon>
          back
        </Link>
        <div className={style.tagDetails}>
          <span>Tag ID:</span>
          <p>{tag?.id}</p>
        </div>
        <div className={style.tagDetails}>
          <span>Tag Name:</span>
          <p>{tag?.name}</p>
        </div>
        <div className={style.tagDetails}>
          <span>Created:</span>
          <p>{formatDate(tag?.createdAt)}</p>
        </div>
        <div className={style.tagDetails}>
          <span>Last Update:</span>
          <p>{tag?.updatedAt === null ? "" : formatDate(tag?.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default TagDetails;
