import React, { ForwardedRef } from "react";
import styles from "./TtButton.module.scss";

export interface TTButtonProps {
  href?: string;
  text: string;
  onClick?: () => void;
  type?: "primary" | "secondary";
  size?: "small" | "large";
}

const TtButton = (
  { href, text, onClick, type = "primary", size = "small" }: TTButtonProps,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    if (type === "secondary") buttonStyle.push(styles.button_secondary);
    return buttonStyle.join(" ");
  };

  const getTextStyle = () => {
    let textStyle = [styles.buttonText];
    if (size === "large") textStyle.push(styles.buttonText_large);

    return textStyle.join(" ");
  };

  return !!href ? (
    <a className={getButtonStyle()} href={href} onClick={onClick} ref={ref}>
      <span className={getTextStyle()}>{text}</span>
    </a>
  ) : (
    <button onClick={onClick}>{text}</button>
  );
};

export default React.forwardRef(TtButton);
