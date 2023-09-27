import style from "./managetags.module.css";

function ManageTags() {
  return (
    <div className={style.manageTagsWrapper}>
      <header>
        <h1>OR-Stretch | Back Office | Manage Tagss</h1>
      </header>

      <form action="#">
        <h1>Add New Tag</h1>
        <div>
          <input type="text" placeholder="Tag Name" />
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ManageTags;
