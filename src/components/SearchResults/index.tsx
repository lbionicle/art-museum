import { useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { useSearchParams } from 'react-router-dom';
import { searchArtwork } from '@/api/route';
import { SmallCard } from '../Card';
import { ReactNode } from 'react';
import { SmallCardSkeleton } from '../Skeletons';
import { SEARCH_PAGE_LIMIT } from '@/constants';

export default function SearchResults() {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();
  const query = searchParams.get('search') || '';

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchArtwork', query],
    queryFn: () => searchArtwork(query),
    enabled: query.trim().length > 0,
  });

  const artworks = data ?? [];

  const renderTable = (content: ReactNode) => {
    return (
      <div className="container">
        <Table variant="small">{content}</Table>
      </div>
    );
  };

  if (isLoading) {
    const content = Array.from({ length: SEARCH_PAGE_LIMIT }).map((_, i) => (
      <SmallCardSkeleton key={i} />
    ));
    return renderTable(content);
  }
  if (error) return <div className="container title title--text">Something went wrong!</div>;
  if (!artworks.length && query.trim())
    return <div className="container title title--text not-found">No artworks found!</div>;

  return renderTable(artworks.map((artwork) => <SmallCard key={artwork.id} {...artwork} />));
}
