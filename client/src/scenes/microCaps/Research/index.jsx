import React from "react";
import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import ResearchTable from "./ResearchTable";

const ResearchPage = () => {
  return (
    <Box>
      <Navbar />
      <ResearchTable />
    </Box>
  );
};

export default ResearchPage;
