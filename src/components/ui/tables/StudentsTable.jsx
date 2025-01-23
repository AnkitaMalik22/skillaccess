import React, { useState } from "react";
import { Table } from "./Table";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const StudentsTable = ({
  data,
  isLoading,
  onRowClick,
  filterFields, // Array of filter configurations
}) => {
  const [filters, setFilters] = useState({});
  const [isInputOpen, setIsInputOpen] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilter = (field) => {
    setFilters((prev) => {

      return { ...prev, [field]: "" }
    });
    setIsInputOpen((prev) => ({ ...prev, [field]: false }));
  };

  // Apply filters dynamically
  const filteredData = data?.filter((item, index) => {
    return filterFields.every(({ accessor, filterKey }) => {
      const value = filters[filterKey];
      if (!value) return true; // No filter applied
      const fieldValue = accessor(item)?.toString().toLowerCase();
      return fieldValue?.includes(value?.toLowerCase());
    });
  });

  // Add Serial Numbers
  const filteredDataWithIndex = filteredData?.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  // Dynamically build columns
  const columns = [
    {
      header: "S.No",
      accessor: "index",
    },
    ...filterFields.map(({ header, accessor, filterKey }) => ({
      header: (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span>{header}</span>
            <button
              onClick={() => {
                if (isInputOpen[filterKey]) {
                  // If the input is open, reset the filter and close it
                  resetFilter(filterKey);
                  setIsInputOpen((prev) => ({ ...prev, [filterKey]: false }));
                } else {
                  // If the input is closed, open it
                  setIsInputOpen((prev) => ({ ...prev, [filterKey]: true }));
                }
              }}
              className="ml-2 text-gray-500"
            >
              {isInputOpen[filterKey] ? <IoMdClose /> : <RiArrowDropDownLine />}
            </button>
          </div>
          {isInputOpen[filterKey] && (
            <div className="flex items-center">
              <input
                type="text"
                placeholder={`Filter by ${header}`}
                value={filters[filterKey] || ""}
                onChange={(e) => handleFilterChange(filterKey, e.target.value)}
                className="mt-1 p-2 text-sm border rounded-md"
              />
              <span className="ml-2 text-gray-500">
                {filteredDataWithIndex.length}
              </span>
            </div>
          )}
        </div>
      ),
      accessor,
    })),
  ];

  return (
    <Table
      columns={columns}
      data={filteredDataWithIndex}
      isLoading={isLoading}
      onRowClick={onRowClick}
    />
  );
};

export default StudentsTable;
