import React from "react";
import HeaderAbsentTable from "./HeaderAbsentTable";
import AbsentTable from "./AbsentTable";
import FooterAbsentTable from "./FooterAbsentTable";

const ViewAbsentTable = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br px-4 py-5">
      <HeaderAbsentTable />
      <AbsentTable />
      <FooterAbsentTable />
    </div>
  );
};

export default ViewAbsentTable;
