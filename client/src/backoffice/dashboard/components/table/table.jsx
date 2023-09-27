import { formatDate } from "../../../utils/fomatDate";
import style from "./table.module.css";

const Table = ({ data, column, handleViewDetails }) => {
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
                      <td key={index + "data"} onClick={handleViewDetails}>
                        <span className={style.details}>delete</span>
                      </td>
                    );
                  }
                  if (columnItem?.value === "update") {
                    return (
                      <td key={index + "data"} onClick={handleViewDetails}>
                        <span
                          className={`${style.statusPill} ${
                            row[columnItem?.value] === "update"
                              ? style.success
                              : row[columnItem?.value] === "delete"
                              ? style.pending
                              : style.failed
                          }`}
                        >
                          update
                          {/* {row[columnItem?.value]} */}
                        </span>
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
