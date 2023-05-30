import { ReactNode } from "react";
// import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
  btnClass: string;
  icon: ReactNode;
  onClick?: () => void;
}

export default function Button({
  text = "click",
  btnClass,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <button className={`btn ${btnClass}`} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
}
