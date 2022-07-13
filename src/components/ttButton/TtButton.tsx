import React, { ButtonHTMLAttributes, ForwardedRef } from "react";
import styles from "./TtButton.module.scss";

export interface TTButtonProps {
  href?: string;
  text: string;
  onClick?: () => void;
  type?: "primary" | "secondary" | "transparent";
  size?: "small" | "large";
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  width?: "auto" | "fixed";
}

const TtButton = (
  {
    href,
    text,
    onClick,
    type = "primary",
    size = "small",
    buttonType = "button",
    width = "fixed",
  }: TTButtonProps,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    if (type === "secondary") buttonStyle.push(styles.button_secondary);
    else if (type === "transparent")
      buttonStyle.push(styles.button_transparent);
    if (width === "auto") buttonStyle.push(styles.button_auto);
    return buttonStyle.join(" ");
  };

  const getTextStyle = () => {
    let textStyle = [styles.buttonText];
    if (size === "large") textStyle.push(styles.buttonText_large);
    if (type === "transparent") textStyle.push(styles.buttonText_transparent);
    return textStyle.join(" ");
  };

  return !!href ? (
    <a className={getButtonStyle()} href={href} onClick={onClick} ref={ref}>
      <span className={getTextStyle()}>{text}</span>
    </a>
  ) : (
    <button type={buttonType} className={getButtonStyle()} onClick={onClick}>
      <span className={getTextStyle()}>{text}</span>
    </button>
  );
};

export default React.forwardRef(TtButton);
