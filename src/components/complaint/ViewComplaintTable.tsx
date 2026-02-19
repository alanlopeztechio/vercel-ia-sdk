"use client";
import ComplaintTable from "./ComplaintTable";
import HeaderComplaintTable from "./HeaderComplaintTable";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

const ViewComplaintTable = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const complaints = useQuery(api.complaint.getComplaint);
  return (
    <div className="w-full h-full bg-gradient-to-br px-4 py-5">
      <HeaderComplaintTable
        onChange={(searchQuery) => {
          setSearchQuery(searchQuery);
        }}
      />
      <ComplaintTable complaints={complaints || []} searchQuery={searchQuery} />
    </div>
  );
};

export default ViewComplaintTable;
