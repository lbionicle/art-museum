import { Link } from 'react-router-dom';
import { CardProps } from './SmallCard';
import FavButton from './FavButton';

export default function LargeCard({ id, image, title, artist, isPublic }: CardProps) {
  return (
    <Link to={`/artworks/${id}`} className="card card--large">
      <img className="card__image" src={image.src} alt={image.alt} />
      <div className="card__content">
        <div className="card__info">
          <h2 className="card__title">{title}</h2>
          <p className="card__artist">{artist}</p>
          <strong className="card__status">{isPublic ? 'Public' : 'Private'}</strong>
        </div>
        <FavButton id={id} />
      </div>
    </Link>
  );
}
