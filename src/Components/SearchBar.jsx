import React, { useState } from "react";

export default function SearchBar({ onSearch, placeholder = "Search coins (e.g. bitcoin)" }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form onSubmit={submit} style={{display:"flex",gap:8,alignItems:"center"}}>
      <input
        className="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
      />
      <button className="btn" type="submit">Search</button>
    </form>
  );
}
