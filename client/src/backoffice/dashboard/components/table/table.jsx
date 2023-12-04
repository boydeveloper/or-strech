import { Link } from "react-router-dom";
import { convertTo12, formatDate } from "../../../utils/fomatDate";
import style from "./table.module.css";
import { useState } from "react";
import { SwapVert } from "../../../../frontend/utils/svg";

const Table = ({
  data,
  column,
  handleDelete,
  tag,
  showFilter,
  searchInput,
  loading,
  updateSearchInput,
}) => {
  const [sortConfig, setSortConfig] = useState(null);

  function parseJsonSafely(jsonString) {
    try {
      return JSON?.parse(jsonString);
    } catch (error) {
      return [];
    }
  }

  const isSortable = (columnName) => {
    return true;
  };

  const handleSort = (columnName) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === columnName &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key: columnName, direction });
  };

  const sortedData = [...data];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  console.log(sortedData);

  return (
    <div className={style.tableWrapper}>
      <table className={style.table}>
        {/* ... (existing code) */}
        <thead>
          <tr>
            {column?.map((item, index) => (
              <th
                key={index + "header"}
                onClick={() => handleSort(item.name)}
                style={{
                  cursor: isSortable(item.name) ? "pointer" : "auto",
                }}
              >
                {isSortable(item.name) && showFilter && (
                  <span className={style.SwapVert}>
                    <SwapVert />
                  </span>
                )}
                {item?.heading}

                {showFilter && (
                  <>
                    {item?.heading !== "Delete" &&
                      item?.heading !== "Update" && (
                        <div className={style.columnSearch}>
                          <input
                            type="text"
                            name={item?.name}
                            value={searchInput[item?.name] || ""}
                            onChange={(e) => {
                              updateSearchInput(item?.name, e.target.value);
                            }}
                          />
                        </div>
                      )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData?.map((row, index) => (
            <tr key={index + "row"}>
              {column?.map((columnItem, index) => {
                if (columnItem.value === "delete") {
                  return (
                    <td key={index + "data"}>
                      <span
                        onClick={() => handleDelete(row.email || row.name)}
                        className={style.failed}
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </span>
                    </td>
                  );
                }
                if (columnItem?.value === "update") {
                  return (
                    <td key={index + "data"}>
                      <Link
                        to={
                          tag
                            ? `/dashboard/update-tag/${row.id}`
                            : `/dashboard/update-user/${row.id}`
                        }
                        className={`${style.statusPill} ${
                          row[columnItem?.value] === "update"
                            ? style.success
                            : row[columnItem?.value] === "delete"
                            ? style.pending
                            : style.failed
                        }`}
                      >
                        <ion-icon name="create"></ion-icon>
                      </Link>
                    </td>
                  );
                }
                if (columnItem?.value === "baseline") {
                  return (
                    <td key={index + "data"}>
                      <span
                        className={
                          row.baseline === true
                            ? `${style.true}`
                            : `${style.false}`
                        }
                      >
                        {row.baseline === true ? "True" : "False"}
                      </span>
                    </td>
                  );
                } else if (columnItem?.heading === "User Tag(s)") {
                  const parsedTags = row.tags_excel
                    ? parseJsonSafely(row.tags_excel)
                    : [];

                  return (
                    <td key={index + "data"}>
                      {Array.isArray(parsedTags)
                        ? parsedTags.join(", ")
                        : parsedTags}
                    </td>
                  );
                } else if (columnItem?.value === "event_type") {
                  return (
                    <td key={index + "data"}>
                      {row.event_type.replace("_", " ")}
                    </td>
                  );
                } else if (columnItem?.heading === "Tag Name") {
                  return (
                    <td key={index + "data"}>
                      <Link
                        className={style.tableLink}
                        to={`/dashboard/manage-tags/${row.name}`}
                      >
                        {row.name}
                      </Link>
                    </td>
                  );
                } else if (columnItem?.heading === "Event Date") {
                  return (
                    <td key={index + "data"}>{convertTo12(row.createdAt)}</td>
                  );
                } else if (
                  columnItem?.value === "createdAt" ||
                  columnItem?.value === "updatedAt"
                ) {
                  return (
                    <td key={index + "data"}>
                      {formatDate(row[columnItem?.value])}
                    </td>
                  );
                } else {
                  return <td key={index + "data"}>{row[columnItem?.value]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
        <div>
          {showFilter && !loading && sortedData?.length === 0 && (
            <div className={style.nouser}>
              <h1>No column matches the search ''</h1>
            </div>
          )}
        </div>
      </table>
    </div>
  );
};

export default Table;
