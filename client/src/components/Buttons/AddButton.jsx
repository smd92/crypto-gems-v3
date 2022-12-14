import React from "react";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddButton = (props) => {
  return (
    <Button variant="contained" startIcon={<AddCircleOutlineOutlinedIcon onClick={props.onClick} />}>
      Add
    </Button>
  );
};

export default AddButton;
