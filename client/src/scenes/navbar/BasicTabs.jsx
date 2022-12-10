import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BasicTabs = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/microcaps");

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="basic tabs example">
          <Tab label="Item One" onClick={handleClick} />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default BasicTabs;
