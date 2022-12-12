import React from 'react'
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = () => {
  return (
    <Button variant="contained" startIcon={<EditIcon />}>
    Edit
  </Button>
  )
}

export default EditButton