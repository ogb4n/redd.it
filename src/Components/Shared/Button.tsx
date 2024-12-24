import React from "react";
interface Props {
  label: string;
  color: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<Props> = ({ label, color, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color} px-2 py-1 rounded-full text-white`}
    >
      {label}
    </button>
  );
};
