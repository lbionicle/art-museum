import React, { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

import search from '@/assets/icons/search.svg';

import './search.scss';

export default function SearchPanel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchParams({ search: debouncedSearchTerm });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchTerm, setSearchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
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
    </>
  );
}
