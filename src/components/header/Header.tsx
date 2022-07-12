import React from "react";

interface HeaderProps {
  onSearch: (value: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchValue, setSearchValue] = React.useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchValue);
    setSearchValue("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <header>
      Planets explorer
      <form onSubmit={onSubmit}>
        <input
          value={searchValue}
          onChange={onChange}
          type="text"
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
