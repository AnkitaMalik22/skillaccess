import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Table({ columns, data, isLoading, onRowClick, className }) {
  return (
    <div className={classNames("overflow-x-auto", className)}>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-accent bg-opacity-10 shadow-md">
            {columns.map((column, index) => (
              <th
                key={index}
                className={classNames(
                  "p-4 text-left font-bold text-base text-gray-700 border-b border-gray-200",
                  index === 0 ? "rounded-tl-lg" : "",
                  index === columns.length - 1 ? "rounded-tr-lg" : "",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                No data found
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={classNames(
                  "transition-all hover:bg-gray-50 hover:shadow-md border-b border-gray-200",
                  onRowClick ? "cursor-pointer" : ""
                )}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={classNames(
                      "p-4 text-gray-600",
                      column.className
                    )}
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

  );
}
