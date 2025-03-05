import React from "react";
interface Props {
  labelText: string;
  placeholderText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  type?: string;
}

const Input = ({
  labelText,
  placeholderText,
  name,
  value,
  onChange,
  type = "text",
}: Props) => {
  return (
    <div>
      <label>
        {labelText}
        <input
          type={type}
          placeholder={placeholderText}
          name={name}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
