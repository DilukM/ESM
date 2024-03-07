// Button.jsx
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';

const Button = ({ onClick, label }) => {
    const theme = useTheme();
    const [isHoveredBtn, setIsHoveredBtn] = useState(false);

    const handleMouseEnterBtn = () => {
        setIsHoveredBtn(true);
    };

    const handleMouseLeaveBtn = () => {
        setIsHoveredBtn(false);
    };

    const btnBoxStyle = {
        marginTop: "20px",
        marginRight: "20px",
        backgroundColor: isHoveredBtn ? "grey" : theme.palette.secondary[400],
        position: "relative",
        top: 0,
        // right: 0,
        left:1000,
        
        color: "white",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        padding: "5px 10px",
    };

    const buttonStyle = {
        backgroundColor: "transparent",
        border: "none",
        color: "inherit",
        cursor: "pointer",
        outline: "none",
        "&:hover": {
            backgroundColor: theme.palette.secondary[400],
        }
    };

    return (
        <Box
            className="btnBox"
            style={btnBoxStyle}
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
