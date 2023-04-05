import SearchBar from "./SearchBar";

const Nav = ({ onSearch, getRandon }) => {
  return(
    <SearchBar onSearch={onSearch} getRandon={getRandon}  />

  ) 
};

export default Nav;
