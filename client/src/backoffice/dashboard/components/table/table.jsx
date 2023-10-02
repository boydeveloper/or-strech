import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/fomatDate";
import style from "./table.module.css";

const Table = ({ data, column, handleDelete, tag }) => {
  return (
    <div className={style.tableWrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            {column?.map((item, index) => {
              return <th key={index + "header"}>{item?.heading}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data?.map((row, index) => {
            return (
              <tr key={index + "row"}>
                {column?.map((columnItem, index) => {
                  if (columnItem?.value === "delete") {
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
        </tbody>
      </table>
    </div>
  );
};

export default Table;
