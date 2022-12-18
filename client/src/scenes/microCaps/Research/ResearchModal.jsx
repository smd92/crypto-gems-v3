import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import ResearchForm from "./ResearchForm";
import AddButton from "components/Buttons/AddButton";
import EditButton from "components/Buttons/EditButton";
import DeleteButton from "components/Buttons/DeleteButton";
import TweetButton from "components/Buttons/TweetButton";

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

const ResearchModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState(null);

  const isAdd = props.dbOperation === "addData";
  const isEdit = props.dbOperation === "editData";
  const isDelete = props.dbOperation === "deleteData";
  const isTweet = props.dbOperation === "tweetData";

  return (
    <>
      {isAdd && <AddButton onClick={() => setOpen(true)} />}
      {isEdit && (
        <EditButton
          onClick={async () => {
            setOpen(true);
            const data = await props.getDataById();
            setFormValues(data.researchData);
          }}
        />
      )}
      {isDelete && <DeleteButton onClick={() => setOpen(true)} />}
      {isTweet && <TweetButton onClick={() => setOpen(true)} />}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isAdd && (
            <ResearchForm
              crudFunction={props.handleOperation}
              submitButton={<AddButton buttonType="submit" />}
              closeModal={() => setOpen(false)}
            />
          )}
          {isEdit && formValues && (
            <ResearchForm
              crudFunction={props.handleOperation}
              formValues={formValues}
              submitButton={<EditButton buttonType="submit" />}
              closeModal={() => setOpen(false)}
            />
          )}
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
          {isTweet && (
            <>
              <Typography>Tweet this data?</Typography>
              <TweetButton
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

export default ResearchModal;
