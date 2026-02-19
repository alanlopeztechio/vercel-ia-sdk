import React from "react";

interface NoContentTableProps {
  columns: number;
  message: string;
}

const NoContentTable: React.FC<NoContentTableProps> = ({
  columns,
  message,
}) => {
  return (
    <tr>
      <td colSpan={columns} className="px-6 py-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="h-12 w-12 text-slate-600 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646M9 9H3v10a6 6 0 006 6h6a6 6 0 006-6V9h-6a4 4 0 00-4-4H9z"
            />
          </svg>
          <p className="text-sm font-medium text-slate-400">{message}</p>
        </div>
      </td>
    </tr>
  );
};

export default NoContentTable;
