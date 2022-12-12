import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = (props) => {
  return (
    <Button
      variant="contained"
      startIcon={<DeleteIcon />}
      onClick={props.deleteData}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
