import React from "react";
import styles from "./searchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

function SearchBar({ value, onChange, onSearch, onClear }: SearchBarProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  }

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <IconButton
          type="button"
          onClick={onClear}
          aria-label="Limpiar"
          size="small"
        >
          <CloseIcon className={styles.icon} />
        </IconButton>
      )}
      <IconButton type="button" onClick={onSearch} aria-label="Buscar">
        <SearchIcon className={styles.icon} />
      </IconButton>
    </div>
  );
}

export default SearchBar;
