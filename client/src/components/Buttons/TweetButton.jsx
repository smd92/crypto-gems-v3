import React from 'react'
import Button from "@mui/material/Button";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const TweetButton = () => {
    return (
        <Button variant="contained" startIcon={<SendOutlinedIcon />}>
          Tweet
        </Button>
      );
}

export default TweetButton