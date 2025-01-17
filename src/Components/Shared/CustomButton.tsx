import React from "react";
import { Button, ButtonProps } from "@mui/joy";

interface CustomButtonProps extends ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  variant = "solid",
  size = "md",
  onClick,
  type,
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
