import React, { ReactNode } from "react";
import styles from "./TtCard.module.scss";

export interface TtCardProps {
  children: ReactNode;
  highlighted?: boolean;
}

const TtCard = ({ children, highlighted }: TtCardProps) => {
  return (
    <div className={`${styles.card} ${highlighted && styles.card_highlighted}`}>
      {children}
    </div>
  );
};

export default TtCard;
