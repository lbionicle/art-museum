import { ReactNode, useState, useMemo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { LargeCard } from '../Card';
import { fetchPaginatedArtworks } from '@/api/route';
import Pagination from './Pagination';
import { LargeCardSkeleton } from '../Skeletons';
import SortSelect, { SortConfig } from './SortSelect';

export default function Gallery() {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'date',
    order: 'desc',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['gallery', page],
    queryFn: () => fetchPaginatedArtworks(page),
    placeholderData: keepPreviousData,
  });

  const sortedArtworks = useMemo(() => {
    if (!data?.artworks) return [];

    return [...data.artworks].sort((a, b) => {
      if (sortConfig.field === 'title') {
        return sortConfig.order === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      const dateA = new Date(a.dateStart).getTime();
      const dateB = new Date(b.dateStart).getTime();
      return sortConfig.order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [data?.artworks, sortConfig]);

  const pagination = data?.pagination;

  const renderSection = (content: ReactNode) => {
    return (
      <section className="section--base">
        <div className="container">
          <div>
            <h3 className="title title--subtitle">Topics for you</h3>
            <h2 className="title title--text">Our special gallery</h2>
          </div>
          <SortSelect value={sortConfig} onChange={setSortConfig} />
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
  if (!sortedArtworks.length)
    return <div className="container title title--text not-found">No artworks found!</div>;

  return renderSection(
    sortedArtworks.map((artwork) => <LargeCard key={artwork.id} {...artwork} />),
  );
}
