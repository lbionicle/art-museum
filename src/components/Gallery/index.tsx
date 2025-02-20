import { ReactNode, useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { LargeCard } from '../Card';
import { fetchPaginatedArtworks } from '@/api/route';
import Pagination from './Pagination';
import { LargeCardSkeleton } from '../Skeletons';

export default function Gallery() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['gallery', page],
    queryFn: () => fetchPaginatedArtworks(page),
    placeholderData: keepPreviousData,
  });

  const artworks = data?.artworks ?? [];
  const pagination = data?.pagination;

  const renderSection = (content: ReactNode) => {
    return (
      <section className="section--base">
        <div className="container">
          <h3 className="title title--subtitle">Topics for you</h3>
          <h2 className="title title--text">Our special gallery</h2>
          <Table variant="large">{content}</Table>
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
  };

  if (isLoading) {
    const content = Array.from({ length: 9 }).map((_, i) => <LargeCardSkeleton key={i} />);
    return renderSection(content);
  }

  if (error) return <div className="container title title--text">Something went wrong!</div>;
  if (!artworks.length) return <div>No artworks found</div>;

  return renderSection(artworks.map((artwork) => <LargeCard key={artwork.id} {...artwork} />));
}
