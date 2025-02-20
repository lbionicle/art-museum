import { useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { LargeCard } from '../Card';
import { fetchPaginatedArtworks } from '@/api/route';
import Pagination from './Pagination';

export default function Gallery() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['gallery', page],
    queryFn: () => fetchPaginatedArtworks(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const artworks = data?.artworks ?? [];
  const pagination = data?.pagination;

  if (artworks.length === 0) {
    return <div>No artworks found</div>;
  }

  return (
    <section className="section--base">
      <div className="container">
        <h3 className="title title--subtitle">Topics for you</h3>
        <h2 className="title title--text">Our special gallery</h2>
        <Table variant="large">
          {artworks.map((artwork) => (
            <LargeCard key={artwork.id} {...artwork} />
          ))}
        </Table>
        {pagination && (
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </section>
  );
}
