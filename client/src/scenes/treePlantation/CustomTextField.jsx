import React from "react";
import TextField from "@mui/material/TextField";
// import { useTheme } from "@mui/material";


const CustomTextField = ({
  label, variant, fullWidth, value, onChange, error, helperText, sx,...props

}) => {
  // const theme = useTheme();

  return (
    
    <TextField
    label={label}
    variant={variant}
    fullWidth={fullWidth}
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
    {...props}
      sx={sx}
    >
      {/* {children} */}
    </TextField>
  );
};

export default CustomTextField;