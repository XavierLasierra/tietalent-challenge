import React from "react";
import Image from "next/image";
import Link from "next/link";

import TtButton from "../ttButton/TtButton";
import TtInput from "../ttInput/TtInput";

import { AppRoutes } from "@/routes/appRoutes";

import styles from "./Header.module.scss";

interface HeaderProps {
  onSearch: (value: string) => void;
  initialSearchValue?: string;
}

const Header = ({ onSearch, initialSearchValue }: HeaderProps) => {
  const [searchValue, setSearchValue] = React.useState(
    initialSearchValue || ""
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <header className={styles.header}>
      <nav>
        <Link href={AppRoutes.home}>
          <a>
            <Image src="/page_logo.png" width={32} height={32} />
          </a>
        </Link>
      </nav>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <TtInput
          placeholder="Planet name"
          value={searchValue}
          onChange={onChange}
          type="search"
        />
        <TtButton
          text="SEARCH"
          buttonType="submit"
          type="transparent"
          width="auto"
        />
      </form>
    </header>
  );
};

export default Header;
