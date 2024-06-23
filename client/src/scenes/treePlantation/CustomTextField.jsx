import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";


const CustomTextField = ({
  label, variant, fullWidth, value, onChange, error, helperText, sx,...props

}) => {
  // const theme = useTheme();

  return (
    // <Box sx={{
    //   "&.Mui-focused": { color: "#d67e75" },
    //   "&.MuiInputLabel-shrink": { color: "#d67e75" },
    // }}>
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
    // </Box>
  );
};

export default CustomTextField;