import { useEffect, useState } from 'react';

import favoritesIcon from '@/assets/icons/orange-bookmark.svg';
import filledFavoritesIcon from '@/assets/icons/filled-orange-bookmark.svg';

interface FavButtonProps {
  id: number;
}

export default function FavButton({ id }: FavButtonProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(sessionStorage.getItem('favorites') || '[]');
    setIsFav(favorites.includes(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(sessionStorage.getItem('favorites') || '[]');

    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId: number) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFav(!isFav);
  };

  return (
    <button className="button--favorite" onClick={toggleFavorite}>
      <img
        src={isFav ? filledFavoritesIcon : favoritesIcon}
        alt={isFav ? 'Remove from favorites' : 'Add to favorites'}
      />
    </button>
  );
}
