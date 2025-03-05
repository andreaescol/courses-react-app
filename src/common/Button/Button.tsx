import React from "react";

interface Props {
  buttonText?: string;
  iconSrc?: string;
  altText?: string;
  onClick: (event: React.MouseEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  buttonText,
  iconSrc,
  altText,
  onClick,
  className = "btn",
  type = "button",
}: Props) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {iconSrc ? (
        <img src={iconSrc} alt={altText} width="20" height="20" />
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
