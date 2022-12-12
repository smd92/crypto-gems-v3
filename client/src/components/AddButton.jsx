import React from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddButton = () => {
  return (
    <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />}>
      Add
    </Button>
  );
};

export default AddButton;
