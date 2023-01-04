import React from "react";
import { TextField } from "@mui/material";
import { format, parse } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const dateFormat = "MM/dd/yyyy";
const today = format(new Date(), dateFormat);

const BasicDatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={props.date ? props.date : today}
        onChange={(newValue) => {
          props.setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
