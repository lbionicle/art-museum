import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { LargeCard } from '../Card';
import { fetchPaginatedArtworks } from '@/api/route';

export default function Gallery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['gallery', 1, 4],
    queryFn: () => fetchPaginatedArtworks(1, 4),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const artworks = data?.artworks ?? [];

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
      </div>
    </section>
  );
}
