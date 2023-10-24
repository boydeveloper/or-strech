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

  // const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [emailToBeDeleted, setEmailToBeDeleted] = useState(null);
  const [modal, setModal] = useState("");
  const tableColumn = [
    { heading: "Full Name", name: "name", value: "name" },
    { heading: "Email", name: "email", value: "email" },

    { heading: "User Tag(s)", name: "tag", value: "tags_excel" },

    { heading: "Last Login", name: "updatedAt", value: "updatedAt" },
    { heading: "Update", value: "update" },
    { heading: "Delete", value: "delete" },
  ];
  const [searchInput, setSearchInput] = useState({
    tag: "",
    email: "",
    type: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  });
  console.log(searchInput);
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      setLoading(true);
      const debounceTimer = setTimeout(() => {
        setDebouncedValue(value);
        setLoading(false);
      }, delay);

      return () => {
        clearTimeout(debounceTimer);
      };
    }, [value, delay]);

    return debouncedValue;
  };
  const debouncingDelay = 3000;
  console.log(searchInput);
  const debouncedSearchInput = useDebounce(searchInput, debouncingDelay);
  console.log(debouncedSearchInput);
  const updateSearchInput = (name, value) => {
    setSearchInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const getStretchers = async () => {
    try {
      setLoading(true);
      const { tag, name, createdAt, updatedAt, email } = debouncedSearchInput;
      const stretchersData = await getUsers(
        currentPage,
        usersPerPage,
        user?.token,
        name,
        email,
        tag,
        "",
        createdAt,
        updatedAt,
        ""
      );

      setLoading(false);
      const stretchers = stretchersData.users.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUsers(stretchers);

      const totalUsers = stretchersData.totalNoOfUsers;
      const calculatedPageCount = Math.ceil(totalUsers / usersPerPage);
      setPageCount(calculatedPageCount);
    } catch (error) {
      setLoading(false);
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
  const exportIds = users?.map((data) => data.id);
  const handleExports = async () => {
    await getExports(`/users/export?ids=[${exportIds}]`, user?.token, "Users");
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
  console.log(debouncedSearchInput);
  useEffect(() => {
    getStretchers();
  }, [currentPage, debouncedSearchInput, user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchInput]);
  return (
    <>
      <div className={style.users__overview}>
        <header className={style.overviewHeader}>
          <h1>Back Office | Users</h1>
        </header>

        <div className={style.buttonContainer}>
          <button onClick={() => navigate("/dashboard/add-users")}>
            ADD NEW USER
          </button>

          <button onClick={handleExports}>export users</button>
        </div>
        {loading && <Loader />}
        <div className={style.searchContainer}></div>
        <div className={style.tableWrapper}>
          {users?.length === 0 ? (
            <div className={style.nouser}>
              <h1>No user matches the search</h1>
            </div>
          ) : (
            <div>
              <Table
                searchInput={searchInput}
                updateSearchInput={updateSearchInput}
                showFilter
                column={tableColumn && tableColumn}
                data={users}
                handleDelete={handleEmailToBeDelelted}
              />

              {users?.length > usersPerPage && (
                <div className={style.paginationButtons}>
                  <Pagination
                    currentPage={currentPage}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
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
