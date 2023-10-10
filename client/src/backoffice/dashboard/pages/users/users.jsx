import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/table";
import { getExports, getUsers } from "../../../../Apis/users/userService";
import Loader from "../../../../components/Loader";
import style from "./users.module.css";
import { deleteUser } from "../../../../Apis/auth/userService";
import Pagination from "../../components/pagination/pagination";
import toast from "react-hot-toast";
import DeletePrompt from "../../components/deletePrompt/deletePrompt";
import { useAuth } from "../../../context/auth";

function Users() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [emailToBeDeleted, setEmailToBeDeleted] = useState(null);
  const [modal, setModal] = useState("");
  const tableColumn = [
    { heading: "Name", value: "name" },
    { heading: "Email", value: "email" },
    { heading: "User Type", value: "user_type" },
    { heading: "UserTags", value: "tags_excel" },
    { heading: "First Login", value: "createdAt" },
    { heading: "Last Login", value: "updatedAt" },
    { heading: "Update", value: "update" },
    { heading: "Delete", value: "delete" },
  ];

  const getStretchers = async () => {
    try {
      setLoading(true);
      const stretchersData = await getUsers(
        currentPage,
        usersPerPage,
        searchInput,
        user?.token
      );

      setLoading(false);
      const stretchers = stretchersData.users.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUsers(stretchers);
      console.log(stretchers);
      const totalUsers = stretchersData.totalNoOfUsers;
      const calculatedPageCount = Math.ceil(totalUsers / usersPerPage);
      setPageCount(calculatedPageCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEmailToBeDelelted = (email) => {
    setEmailToBeDeleted(email);
    setModal("prompt");
  };
  const handleExports = async () => {
    await getExports("/users/exportUsers", user?.token);
  };
  const handleDeleteUser = async () => {
    try {
      const deletedUser = await deleteUser(emailToBeDeleted, user?.token);
      setModal("");
      console.log(deletedUser);
      toast.success(deletedUser.message);
      getStretchers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getStretchers();
  }, [currentPage, searchInput, user]);

  return (
    <>
      <div className={style.users__overview}>
        <header className={style.overviewHeader}>
          <h1>OR-Stretch | Back Office | Users</h1>
        </header>

        <div className={style.buttonContainer}>
          <button onClick={() => navigate("/dashboard/add-users")}>
            ADD NEW USER
          </button>

          <button onClick={handleExports}>export users</button>
        </div>
        <div className={style.searchContainer}>
          <div className={style.searchIcon}>
            <ion-icon name="search"></ion-icon>
          </div>
          <input
            type="text"
            placeholder="Search.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className={style.tableWrapper}>
          {loading ? (
            <div className={style.loaderContainer}>
              <Loader />
            </div>
          ) : users?.length === 0 ? (
            <div className={style.nouser}>
              <h1>No user matches the search</h1>
            </div>
          ) : (
            <>
              <Table
                column={tableColumn && tableColumn}
                data={users}
                handleDelete={handleEmailToBeDelelted}
              />
              <div className={style.paginationButtons}>
                <Pagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>

        {modal === "prompt" && (
          <DeletePrompt
            text={"user"}
            proceed={handleDeleteUser}
            cancel={() => setModal("")}
          />
        )}
      </div>
    </>
  );
}

export default Users;
