"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import HeaderUserTable from "./HeaderUserTable";
import UserTable from "./UserTable";

const ViewAbsentTable = () => {
  const results = useQuery(api.users.getUsers);
  return (
    <div className="w-full h-full bg-gradient-to-br px-4 py-5">
      <HeaderUserTable />
      <UserTable users={results || []} />
    </div>
  );
};

export default ViewAbsentTable;
