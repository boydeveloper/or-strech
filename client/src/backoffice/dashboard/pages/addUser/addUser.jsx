import style from "./adduser.module.css";

function AddUser() {
  return (
    <div className={style.addUsersWrapper}>
      <header>
        <h1>OR-Stretch | Back Office | Users</h1>
      </header>
      <div className={style.addUserMain}>
        <h1>Add New User</h1>
        <form action="#">
          <label class={style.inputContainer}>
            <input type="email" />
            <span>E-mail</span>
          </label>
          <label class={style.inputContainer}>
            <input type="text" />
            <span>First Name</span>
          </label>
          <label class={style.inputContainer}>
            <input type="text" />
            <span>Last Name</span>
          </label>
          <label class={style.inputContainer}>
            <input type="text" />
            <span>User Type</span>
          </label>

          <div className={style.tagsWrapper}>
            <h1>Select User Tag(s)</h1>
          </div>
          <div className={style.adduserCta}>
            <button>Cancel</button>
            <button>Add user</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
