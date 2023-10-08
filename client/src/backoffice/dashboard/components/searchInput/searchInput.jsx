import style from "./searchinput.module.css";
import { useState } from "react";
import debounce from "lodash.debounce";

function SearchInput({ placeholder, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce((value) => {
    onSearch(value);
  }, 400);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className={style.searchContainer}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchInput;
