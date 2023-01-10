import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import PortfolioForm from "./PortfolioForm";
import AddButton from "components/Buttons/AddButton";
import EditButton from "components/Buttons/EditButton";
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

const PortfolioModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(null);

  const isAdd = props.dbOperation === "addData";
  const isEdit = props.dbOperation === "editData";
  const isDelete = props.dbOperation === "deleteData";

  return (
    <>
      {isAdd && <AddButton onClick={() => setOpen(true)} />}
      {isEdit && (
        <EditButton
          onClick={async () => {
            setOpen(true);
            const data = await props.getDataById();
            setFormValues(data);
          }}
        />
      )}
      {isDelete && <DeleteButton onClick={() => setOpen(true)} />}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isAdd && (
            <PortfolioForm
              crudFunction={props.handleOperation}
              submitButton={<AddButton buttonType="submit" />}
              closeModal={() => setOpen(false)}
            />
          )}
          {isEdit && formValues && (
            <PortfolioForm
              crudFunction={props.handleOperation}
              formValues={formValues}
              submitButton={<EditButton buttonType="submit" />}
              closeModal={() => setOpen(false)}
            />
          )}
          {isDelete && (
            <>
              <Typography>Do you really want to delete this data?</Typography>
              {props.selectedRowData.map((row) => <Typography>{row.tokenSymbol}</Typography>)}
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

export default PortfolioModal;
