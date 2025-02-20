import { useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { SmallCard } from '../Card';
import { fetchPaginatedArtworks } from '@/api/route';
import { ReactNode } from 'react';
import { SmallCardSkeleton } from '../Skeletons';

export default function ArtRecs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['gallery', 1, 9],
    queryFn: () => fetchPaginatedArtworks(1, 9),
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
    const content = Array.from({ length: 9 }).map((_, i) => <SmallCardSkeleton key={i} />);
    return renderSection(content);
  }

  if (error) return <div className="container title title--text">Something went wrong!</div>;
  if (!artworks.length) return <div>No artworks found</div>;

  return renderSection(artworks.map((artwork) => <SmallCard key={artwork.id} {...artwork} />));
}
