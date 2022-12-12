import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

const DeleteButton = (props) => {
  const token = useSelector((state) => state.token);

  const deleteData = async () => {
    for (let i = 0; i < props.data.length; i++) {
      try {
        const response = await fetch(`/dexGemsResearch/${props.data[i].id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
      } catch (err) {
        console.log("Unable to delete data: " + err.message);
      }
    }
  };

  return (
    <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteData}>
      Delete
    </Button>
  );
};

export default DeleteButton;
