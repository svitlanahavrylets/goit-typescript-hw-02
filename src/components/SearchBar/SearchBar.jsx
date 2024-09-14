import { useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      toast.error("Please, enter the query");
      return;
    }
    onSubmit(searchTerm);
    setSearchTerm("");
  };
  return (
    <>
      <header className={css.header}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <div className={css.divSearchForm}>
            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={searchTerm}
              onChange={handleChange}
            />
            <button className={css.searchBtn} type="submit">
              <FiSearch size="18" />
            </button>
          </div>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
