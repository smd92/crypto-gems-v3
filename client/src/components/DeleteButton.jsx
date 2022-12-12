import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = () => {
  return (
    <Button variant="contained" startIcon={<DeleteIcon />}>
      Delete
    </Button>
  );
};

export default DeleteButton;
