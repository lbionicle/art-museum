import search from '@/assets/icons/search.svg';

import './search.scss';
import React, { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { searchSchema } from '@/api/schema';

export default function SearchPanel() {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!debouncedSearchTerm) return;

    const result = searchSchema.safeParse(debouncedSearchTerm);
    if (!result.success) {
      console.warn('Validation error:', result.error.errors);
      return;
    }

    const safeQuery = encodeURIComponent(result.data);

    console.log(safeQuery);
  }, [debouncedSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="search-panel">
        <input
          className="search-panel__input"
          type="text"
          placeholder="Search Art, Artist, Work..."
          value={searchTerm}
          onChange={handleChange}
        />
        <img className="search-panel__icon" src={search} alt="Search" />
      </form>
    </div>
  );
}
