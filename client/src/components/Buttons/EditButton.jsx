import React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = (props) => {
  return (
    <Button
      variant="contained"
      startIcon={<EditIcon />}
      type={props.buttonType}
      onClick={props.onClick}
    >
      Edit
    </Button>
  );
};

export default EditButton;
