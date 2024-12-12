import React from "react";
interface Props {
  label: string;
  color: string;
  onClick: () => void;
}
const Button: React.FC<Props> = ({ label, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${color} px-2 py-1 rounded-full text-white`}
    >
      {label}
    </button>
  );
};
export default Button;
