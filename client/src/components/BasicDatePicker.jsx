import React from "react";
import { TextField } from "@mui/material";
import { format, parse } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const dateFormat = 'dd/MM/yyyy';
const today = format( new Date(), dateFormat );

const BasicDatePicker = () => {
  const [value, setValue] = React.useState(today);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
