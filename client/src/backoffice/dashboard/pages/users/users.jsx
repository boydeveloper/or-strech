import { useEffect, useState } from "react";
import {
  unstable_HistoryRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const { user } = useAuth();
  const [totalEntries, setTotalEntries] = useState(null);
  const [users, setUsers] = useState(null);

  // const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  // const [entriesPerPage, setEntriesPerPage] = useState(10); //
  const [availableOptions, setAvailableOptions] = useState([]);
  const [emailToBeDeleted, setEmailToBeDeleted] = useState(null);
  const [modal, setModal] = useState("");
  const tableColumn = [
    { heading: "Full Name", name: "name", value: "name" },
    { heading: "Email", name: "email", value: "email" },
    { heading: "User Tag(s)", name: "tag", value: "tags_excel" },
    { heading: "Date Created", name: "createdAt", value: "createdAt" },
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

  const getShowingEntriesMessage = () => {
    if (users) {
      const startIndex = (currentPage - 1) * usersPerPage + 1;
      const endIndex = Math.min(currentPage * usersPerPage, totalEntries);
      return `Showing ${startIndex} to ${endIndex} of ${totalEntries} entries`;
    }

    return "";
  };

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
  const debouncedSearchInput = useDebounce(searchInput, debouncingDelay);
  const updateSearchInput = (name, value) => {
    setSearchInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const [selectOptions, setSelectOptions] = useState([]);
  // const history = useHis();
  const location = useLocation();

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
      setTotalEntries(stretchersData.totalNoOfUsers);

      const totalUsers = stretchersData.totalNoOfUsers;

      const calculatedPageCount = Math.ceil(totalUsers / usersPerPage);
      setPageCount(calculatedPageCount);
    } catch (error) {
      setLoading(false);
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

      toast.success(deletedUser.message);
      getStretchers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  useEffect(() => {
    getStretchers();
  }, [currentPage, debouncedSearchInput, user, location.pathname]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchInput]);
  useEffect(() => {
    if (users) {
      const totalUsers = totalEntries;
      const maxOptions = Math.min(totalUsers, 10);
      const newOptions = Array.from(
        { length: maxOptions },
        (_, index) => (index + 1) * 10
      );
      setSelectOptions(newOptions);

      setAvailableOptions(newOptions);
    }
  }, [users, entriesPerPage]);
  return (
    <>
      <div className={style.users__overview}>
        <header className={style.overviewHeader}>
          <h1>Back Office | Users</h1>
        </header>

        <div className={style.usersCTA}>
          <div className={style.entriesBox}>
            <label>Show entries: </label>
            <select
              value={entriesPerPage}
              onChange={handleEntriesPerPageChange}
            >
              {selectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={style.buttonContainer}>
            <button onClick={() => navigate("/dashboard/add-users")}>
              ADD NEW USER
            </button>

            <button onClick={handleExports}>export users</button>
          </div>
        </div>
        {loading && <Loader />}
        <div className={style.searchContainer}></div>
        <div className={style.tableWrapper}>
          <div>
            <Table
              searchInput={searchInput}
              updateSearchInput={updateSearchInput}
              showFilter
              users
              column={tableColumn && tableColumn}
              data={users}
              handleDelete={handleEmailToBeDelelted}
            />

            {users?.length > usersPerPage && (
              <div className={style.usersFooter}>
                <div className={style.paginationButtons}>
                  <Pagination
                    currentPage={currentPage}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                  />
                </div>
                <div className={style.showingEntriesMessage}>
                  {getShowingEntriesMessage()}
                </div>
              </div>
            )}
          </div>
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
