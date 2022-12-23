import React from "react";
import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import PortfolioTable from "./PortfolioTable";

const PortfolioPage = () => {
  return (
    <Box>
      <Navbar />
      <PortfolioTable />
    </Box>
  );
};

export default PortfolioPage;
