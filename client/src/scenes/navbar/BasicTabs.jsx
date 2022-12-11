import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BasicTabs() {
  const [value, setValue] = React.useState("one");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Home" onClick={() => navigate("/home")} />
        <Tab
          value="two"
          label="Microcaps"
          onClick={() => navigate("/microcaps")}
        />
        <Tab value="three" label="Lowcaps" />
      </Tabs>
    </Box>
  );
}

export default BasicTabs;
