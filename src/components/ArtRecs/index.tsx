import { useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { SmallCard } from '../Card';
import { fetchPaginatedArtworks } from '@/api/route';

export default function ArtRecs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['gallery', 2, 9],
    queryFn: () => fetchPaginatedArtworks(2, 9),
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
        <h3 className="title title--subtitle">Here some more</h3>
        <h2 className="title title--text">Other works for you</h2>
        <Table variant="small">
          {artworks.map((artwork) => (
            <SmallCard key={artwork.id} {...artwork} />
          ))}
        </Table>
      </div>
    </section>
  );
}
