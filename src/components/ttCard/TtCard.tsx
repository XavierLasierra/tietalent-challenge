import React, { ReactNode } from "react";
import styles from "./TtCard.module.scss";

export interface TtCardProps {
  children: ReactNode;
}

const TtCard = ({ children }: TtCardProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default TtCard;
