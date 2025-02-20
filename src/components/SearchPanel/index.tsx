import search from '@/assets/icons/search.svg';

import './search.scss';
import React, { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { searchArtwork } from '@/api/route';

export default function SearchPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: results } = useQuery({
    queryKey: ['searchArtwork', debouncedSearchTerm],
    queryFn: () => searchArtwork(debouncedSearchTerm),
    enabled: debouncedSearchTerm.trim().length > 0,
  });

  console.log(results);

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
