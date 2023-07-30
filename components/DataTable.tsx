import React, { useCallback, useState } from 'react';

export interface DataTableColumn {
  name: string;
  select: string;
  required?: boolean;
  datetime?: boolean;
}

interface DataTableProps {
  columns: DataTableColumn[];
  data: any[];
  page?: number;
  total?: number;
  handleNextPage?: () => void;
  handlePrevPage?: () => void;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DataTable({
  columns,
  data,
  total,
  page,
  handleNextPage,
  handlePrevPage,
  handleSearch
}: DataTableProps) {
  const [selectedFields, setSelectedFields] = useState(
    columns.filter((column) => column.required)
  );

  const handleFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName = e.target.name;
      const isChecked = e.target.checked;
      setSelectedFields((prevSelectedFields) => {
        if (isChecked) {
          const column = columns.find((column) => column.name === fieldName);
          return [...prevSelectedFields, column!];
        } else {
          return prevSelectedFields.filter(
            (selectedField) => selectedField.name !== fieldName
          );
        }
      });
    },
    [columns]
  );

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mb-4">
        <label
          htmlFor="field-select"
          className="block font-medium text-gray-700 dark:text-gray-400 mb-2"
        >
          Select fields:
        </label>
        <div className="flex flex-wrap">
          {columns.map((column) => (
            <div key={column.name} className="mr-4 mb-2">
              <label
                htmlFor={`field-${column.name}`}
                className="inline-flex items-center"
              >
                <input
                  id={`field-${column.name}`}
                  type="checkbox"
                  name={column.name}
                  className="form-checkbox h-4 w-4 text-blue-500"
                  checked={selectedFields.some(
                    (selectedField) => selectedField.name === column.name
                  )}
                  onChange={handleFieldChange}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-400">
                  {column.name}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      {handleSearch && (
        <div className="relative w-full my-4">
          <input
            aria-label="Search data"
            type="text"
            onChange={handleSearch}
            placeholder="Search database"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900  focus:border-y-stone-600 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md bg-gray-300 text-gray-700"
          >
            <div className="px-6 py-4 flex flex-col">
              {selectedFields.map((field, i) => (
                <React.Fragment key={i}>
                  {
                    <div className="flex flex-row justify-between text-sm border-gray-200 dark:border-gray-700">
                      <div className="font-bold">{field.name}</div>
                      <div className="ml-2">
                        {field.datetime
                          ? formatDate(item[field.select])
                          : item[field.select]}
                      </div>
                    </div>
                  }
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      {total && (
        <div className="mt-4 text-gray-700 dark:text-gray-400 text-right">
          Total: {total}
        </div>
      )}
      {handlePrevPage && handleNextPage && (
        <div className="flex justify-between my-4">
          <button
            className="bg-gray-300 text-xs hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={handlePrevPage}
          >
            <ArrowIcon className={'-rotate-90'} />
          </button>
          {page && (
            <button
              className="text-gray-300 bg-gray-800 text-xs rounded py-2 px-2 cursor-none"
              disabled={true}
            >
              {page}
            </button>
          )}
          <button
            className="bg-gray-300 text-xs hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={handleNextPage}
          >
            <ArrowIcon className={'rotate-45'} />
          </button>
        </div>
      )}
    </div>
  );
}

export function ArrowIcon({ className }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}
