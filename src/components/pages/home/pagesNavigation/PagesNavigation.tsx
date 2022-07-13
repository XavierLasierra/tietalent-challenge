import React from "react";

import TtButton from "@/common-components/ttButton/TtButton";

import styles from "./PagesNavigation.module.scss";

interface PagesNavigationProps {
  currentPage: number;
  totalCount: number;
  pageCount: number;
  onPageSelect: (pageNumber: number) => void;
}

const PagesNavigation = ({
  currentPage,
  pageCount,
  totalCount,
  onPageSelect,
}: PagesNavigationProps) => {
  if (!currentPage || !pageCount || !totalCount) return <></>;

  return (
    <div>
      <p className={styles.pageCount}>
        {currentPage} / {totalCount / pageCount}
      </p>
      <nav className={styles.navigationContainer}>
        <div>
          {currentPage > 1 && (
            <TtButton
              text="Previous"
              onClick={() => onPageSelect(currentPage - 1)}
            />
          )}
        </div>
        <div>
          {currentPage * pageCount < totalCount && (
            <TtButton
              text="Next"
              onClick={() => onPageSelect(currentPage + 1)}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default PagesNavigation;
