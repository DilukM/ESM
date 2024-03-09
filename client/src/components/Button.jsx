import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';

const Button = ({ onClick, label, alignment }) => {
    const theme = useTheme();
    const [isHoveredBtn, setIsHoveredBtn] = useState(false);

    const handleMouseEnterBtn = () => {
        setIsHoveredBtn(true);
    };

    const handleMouseLeaveBtn = () => {
        setIsHoveredBtn(false);
    };

    const buttonStyle = {
        backgroundColor: isHoveredBtn ? "grey" : theme.palette.secondary[400],
        color: "white",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
        outline: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary[400],
        }
    };

    return (
        <Box
            className="btnBox"
            style={{ textAlign: alignment }}
            onMouseEnter={handleMouseEnterBtn}
            onMouseLeave={handleMouseLeaveBtn}
        >
            <button onClick={onClick} style={buttonStyle}>
                {label}
            </button>
        </Box>
    );
};

export default Button;
