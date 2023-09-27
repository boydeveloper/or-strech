import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/table";
import { getUsers } from "../../../../Apis/users/userService";
import Loader from "../../../../components/Loader";
import style from "./users.module.css";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20); // Number of users to display per page

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
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
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
                // handleViewDetails={() => setModal("")}
              />
            </>
          )}
          <div className={style.paginationButtons}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={users && users.length < usersPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
