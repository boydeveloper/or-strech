import { Link } from "react-router-dom";
import { convertTo12, formatDate } from "../../../utils/fomatDate";
import style from "./table.module.css";
import { useState } from "react";

const Table = ({
  data,
  column,
  handleDelete,
  tag,
  showFilter,
  searchInput,
  updateSearchInput,
}) => {
  function parseJsonSafely(jsonString) {
    try {
      return JSON?.parse(jsonString);
    } catch (error) {
      // console.error("Error parsing JSON:", error);
      return [];
    }
  }
  const [sort, setSort] = useState({ column: null, order: "asc" });

  const handleSort = (columnName) => {
    if (columnName === sort.column) {
      setSort({ ...sort, order: sort.order === "asc" ? "desc" : "asc" });
    } else {
      setSort({ column: columnName, order: "asc" });
    }
  };

  const isSortable = (columnName) =>
    ["email", "name", "tags_excel", "updatedAt"].includes(columnName);

  console.log(sort);
  const sortData = (data) => {
    if (sort.column && data) {
      return [...data].sort((a, b) => {
        const keyA = a[sort.column];
        const keyB = b[sort.column];
        console.log(keyA);
        if (sort.order === "asc") {
          return keyA?.localeCompare(keyB);
        } else {
          return keyB?.localeCompare(keyA);
        }
      });
    }
    return data;
  };

  const sortedData = sortData(data);
  console.log(sortedData);
  return (
    <div className={style.tableWrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            {column?.map((item, index) => {
              return (
                <th
                  key={index + "header"}
                  onClick={() => handleSort(item.name)}
                  style={{
                    cursor: isSortable(item.name) ? "pointer" : "auto",
                  }}
                >
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
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sortedData?.map((row, index) => {
            return (
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
                    return (
                      <td key={index + "data"}>{row[columnItem?.value]}</td>
                    );
                  }
                })}
              </tr>
            );
          })}

          {sortedData?.length === 0 && (
            <div className={style.nouser}>
              <h1>No user matches the search</h1>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
// convertTo12
