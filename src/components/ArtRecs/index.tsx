import { useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { SmallCard } from '../Card';
import { fetchRandomPaginatedArtworks } from '@/api/route';
import { ReactNode } from 'react';
import { SmallCardSkeleton } from '../Skeletons';
import { MAIN_PAGE_RECOMMENDAION_LIMIT } from '@/constants';

export default function ArtRecs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['recommendation'],
    queryFn: () => fetchRandomPaginatedArtworks(),
  });

  const artworks = data?.artworks ?? [];

  const renderSection = (content: ReactNode) => (
    <section className="section--base">
      <div className="container">
        <h3 className="title title--subtitle">Here some more</h3>
        <h2 className="title title--text">Other works for you</h2>
        <Table variant="small">{content}</Table>
      </div>
    </section>
  );

  if (isLoading) {
    const content = Array.from({ length: MAIN_PAGE_RECOMMENDAION_LIMIT }).map((_, i) => (
      <SmallCardSkeleton key={i} />
    ));
    return renderSection(content);
  }

  if (error) return <div className="container title title--text">Something went wrong!</div>;
  if (!artworks.length)
    return <div className="container title title--text not-found">No artworks found!</div>;

  return renderSection(artworks.map((artwork) => <SmallCard key={artwork.id} {...artwork} />));
}
