import React, { useState } from 'react';

interface SearchFormProps {
  page: number,
  per_page: number,
  onSearch: (username: string, per_page: number, page: number) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ page, per_page, onSearch }) => {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username) {
        onSearch(username, per_page, page)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button type="submit">Search</button>
    </form>
  );
};


