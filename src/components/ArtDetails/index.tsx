import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtworkDetail, isAxiosError } from '@/api/route';
import stripHTML from '@/utils/stripHtml';
import { FavButton } from '../Card';
import { ArtDetailsSkeleton } from '../Skeletons';

import './details.scss';

export default function ArtDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const artworkId = Number(id);

  useEffect(() => {
    if (!id || isNaN(artworkId)) {
      navigate('/404', { replace: true });
    }
  }, [id, navigate, artworkId]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['artworkDetails', artworkId],
    queryFn: () => getArtworkDetail(artworkId),
    enabled: !!id && !isNaN(artworkId),
  });

  useEffect(() => {
    if (error && isAxiosError(error) && error.response?.status === 404) {
      navigate('/404', { replace: true });
    }
  }, [error, navigate]);

  if (isLoading) return <ArtDetailsSkeleton />;

  if (!data) return null;

  return (
    <section className="section--base art-details">
      <div className="container art-details__container">
        <div className="art-details__wrapper">
          <div className="art-details__image">
            <img src={data.image.src} alt={data.title} className="art-details__image-img" />
            <div className="art-details__favorite">
              <FavButton id={artworkId} />
            </div>
          </div>
          <div className="art-details__info">
            <div className="art-details__header">
              <h1 className="art-details__title">{data.title}</h1>
              <div className="art-details__artist">{data.artist}</div>
              <div className="art-details__year">{data.dateDisplay}</div>
            </div>
            <div className="art-details__overview">
              <h2 className="art-details__overview-title">Overview</h2>
              <ul className="art-details__description">
                <li className="art-details__description-item">
                  <span className="art-details__description-label">Artist nationality: </span>
                  {data.nationality}
                </li>
                <li className="art-details__description-item">
                  <span className="art-details__description-label">Dimensions Sheet: </span>
                  {data.dimensions}
                </li>
                <li className="art-details__description-item">
                  <span className="art-details__description-label">Credit Line: </span>
                  {data.creditLine}
                </li>
                <li className="art-details__description-item">
                  <span className="art-details__description-label">Repository: </span>
                  {stripHTML(data.repository)}
                </li>
              </ul>
              <div className="art-details__status">{data.isPublic ? 'Public' : 'Private'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
