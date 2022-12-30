import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import DeleteButton from "components/Buttons/DeleteButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RawDataModal = (props) => {
  const [open, setOpen] = React.useState(false);

  const isDelete = props.dbOperation === "deleteData";

  return (
    <>
      {isDelete && <DeleteButton onClick={() => setOpen(true)} />}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isDelete && (
            <>
              <Typography>Do you really want to delete this data?</Typography>
              <DeleteButton
                onClick={() => {
                  props.handleOperation();
                  setOpen(false);
                }}
              />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default RawDataModal;
