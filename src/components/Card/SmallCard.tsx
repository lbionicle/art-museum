import { Link } from 'react-router-dom';
import FavButton from './FavButton';

import defaultImage from '@/assets/images/default-art.svg';

import './card.scss';

export interface CardProps {
  id: number;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  artist: string;
  isPublic: boolean;
}

export default function SmallCard({ id, image, title, artist, isPublic }: CardProps) {
  return (
    <Link to={`/artworks/${id}`} className="card card--small">
      <img
        className="card__image"
        src={image.src}
        alt={image.alt}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultImage;
        }}
      />
      <div className="card__info">
        <h2 className="card__title">{title}</h2>
        <p className="card__artist">{artist}</p>
        <strong className="card__status">{isPublic ? 'Public' : 'Private'}</strong>
      </div>
      <FavButton id={id} />
    </Link>
  );
}
