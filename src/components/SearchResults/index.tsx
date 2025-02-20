import { useQuery } from '@tanstack/react-query';
import Table from '../Table';
import { useSearchParams } from 'react-router-dom';
import { searchArtwork } from '@/api/route';

export default function SearchResults() {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();
  const query = searchParams.get('search') || '';
  const { data, isLoading, error } = useQuery({
    queryKey: ['searchArtwork', query],
    queryFn: () => searchArtwork(query),
    enabled: query.trim().length > 0,
  });

  if (isLoading) return;
  if (error) return;

  return <Table cards={data ?? []} variant="small" />;
}
