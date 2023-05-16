import { Box, TextField } from "@mui/material";
import { Touched, Status } from "../App";
import React, { useState } from "react";

type FormFieldProps = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setTouched: (touched: Touched) => void;
  touched: Touched;
  error: string | undefined;
  status: Status;
  label: string;
  id: string;
  value: string;
};

function FormField(props: FormFieldProps) {
  const [touched, setTouched] = useState(false);

  return (
    <Box className="my-3">
      <TextField
        label={props.label}
        value={props.value}
        id={props.id}
        onChange={props.onChange}
        onBlur={() => setTouched(true)}
        error={
          (props.status === "submitted" || touched) && Boolean(props.error)
        }
        helperText={(props.status === "submitted" || touched) && props.error}
      />
    </Box>
  );
}

export default FormField;
