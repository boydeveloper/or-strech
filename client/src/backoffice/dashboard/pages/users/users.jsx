import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/table";
import { getUsers } from "../../../../Apis/users/userService";
import Loader from "../../../../components/Loader";
import style from "./users.module.css";
import { deleteUser } from "../../../../Apis/auth/userService";
import Pagination from "../../components/pagination/pagination";
import toast from "react-hot-toast";
import DeletePrompt from "../../components/deletePrompt/deletePrompt";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const [pageCount, setPageCount] = useState(0);
  const [emailToBeDeleted, setEmailToBeDeleted] = useState(null);
  const [modal, setModal] = useState("");

  const tableColumn = [
    { heading: "Name", value: "name" },
    { heading: "Email", value: "email" },
    { heading: "First Login", value: "createdAt" },
    { heading: "Last Login", value: "updatedAt" },
    { heading: "Update", value: "update" },
    { heading: "Delete", value: "delete" },
  ];
  const getStretchers = async () => {
    try {
      setLoading(true);
      const stretchersData = await getUsers(currentPage, usersPerPage);
      setLoading(false);
      const stretchers = stretchersData.users.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUsers(stretchers);
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
  const handleDeleteUser = async () => {
    try {
      const deletedUser = await deleteUser(emailToBeDeleted);
      setModal("");
      console.log(deletedUser);
      toast.error(deletedUser.message);
      getStretchers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getStretchers();
  }, [currentPage]);

  return (
    <>
      <div className={style.users__overview}>
        <header className={style.overviewHeader}>
          <h1>OR-Stretch | Back Office | Users</h1>
        </header>
        <div className={style.buttonContainer}>
          <button onClick={() => navigate("/backoffice/dashboard/add-user")}>
            ADD NEW USER
          </button>
        </div>
        <div className={style.tableWrapper}>
          {loading ? (
            <div className={style.loaderContainer}>
              <Loader />
            </div>
          ) : (
            <>
              <Table
                column={tableColumn && tableColumn}
                data={users}
                handleDelete={handleEmailToBeDelelted}
              />
            </>
          )}
          <div className={style.paginationButtons}>
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        {modal === "prompt" && (
          <DeletePrompt
            proceed={handleDeleteUser}
            cancel={() => setModal("")}
          />
        )}
      </div>
    </>
  );
}

export default Users;
