import React from "react";
import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import RawDataTable from "./RawDataTable";

const RawDataPage = () => {
  return (
    <Box>
      <Navbar />
      <RawDataTable />
    </Box>
  );
};

export default RawDataPage;
