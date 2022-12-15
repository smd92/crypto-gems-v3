import React from "react";
import Button from "@mui/material/Button";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const TweetButton = (props) => {
  return (
    <Button
      variant="contained"
      startIcon={<SendOutlinedIcon />}
      onClick={props.onClick}
    >
      Tweet
    </Button>
  );
};

export default TweetButton;
