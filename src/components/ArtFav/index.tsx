import { ReactNode } from 'react';
import { useQueries, UseQueryOptions } from '@tanstack/react-query';
import { getArtworkDetail } from '@/api/route';
import { FAVORITE_PAGE_LIMIT } from '@/constants';
import { SmallCardSkeleton } from '../Skeletons';
import { SmallCard } from '../Card';
import Table from '../Table';

import favorites from '@/assets/icons/orange-bookmark.svg';

import './favorite.scss';

type Artwork = NonNullable<Awaited<ReturnType<typeof getArtworkDetail>>>;

export default function ArtFav() {
  const storedFavorites = sessionStorage.getItem('favorites');
  const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

  const artworkQueries = useQueries({
    queries: favoriteIds.map((id: number) => ({
      queryKey: ['artwork', id],
      queryFn: () => getArtworkDetail(id),
      enabled: !!id,
    })) as UseQueryOptions<Artwork | null, Error>[],
  });

  const renderSection = (content: ReactNode, wrapWithTable: boolean = true) => (
    <section className="section--base art-fav">
      <div className="container">
        <h1 className="title title--main art-fav__heading">
          Here are your
          <span className="art-fav__highlight">
            <img className="art-fav__icon" src={favorites} alt="Favorites bookmark icon" />
            <span className="art-fav__text">favorites</span>
          </span>
        </h1>
        <h3 className="title title--subtitle">Saved by you</h3>
        <h2 className="title title--text">Your favorites list</h2>
        {wrapWithTable ? <Table variant="small">{content}</Table> : content}
      </div>
    </section>
  );

  if (favoriteIds.length === 0) {
    return renderSection(
      <div className="container title title--text not-found">No favorites found!</div>,
      false,
    );
  }

  const isLoading = artworkQueries.some((query) => query.isLoading);
  if (isLoading) {
    const content = Array.from({ length: FAVORITE_PAGE_LIMIT }).map((_, i) => (
      <SmallCardSkeleton key={i} />
    ));
    return renderSection(content);
  }

  const isError = artworkQueries.some((query) => query.isError);
  if (isError) {
    return renderSection(<div className="container title title--text">Something went wrong!</div>);
  }

  const favoriteArtworks = artworkQueries.map((query) => query.data).filter(Boolean) as Artwork[];

  return renderSection(
    favoriteArtworks.map((artwork) => <SmallCard key={artwork.id} {...artwork} />),
  );
}
