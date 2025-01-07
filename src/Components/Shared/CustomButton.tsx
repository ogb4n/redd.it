import React from "react";
import {  Button, ButtonProps } from "@mui/joy";


interface CustomButtonProps extends ButtonProps {
  label: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  variant = "solid",
  size = "md",
  onClick,
  type = "button",
  ...props
}) => {
  return (
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        type={type}
        {...props}
      >
        {label}
      </Button>
  );
};
