import React from "react";

import styles from "./TtInput.module.scss";

export interface TtInputProps {
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number" | "tel" | "search";
  placeholder?: string;
}

const TtInput = ({
  value,
  onChange,
  type = "text",
  placeholder,
}: TtInputProps) => {
  return (
    <input
      className={styles.textInput}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default TtInput;
