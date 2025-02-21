import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtworkDetail, isAxiosError } from '@/api/route';
import stripHTML from '@/utils/stripHtml';
import { FavButton } from '../Card';
import { ArtDetailsSkeleton } from '../Skeletons';
import LightBox from './LightBox';

import defaultImage from '@/assets/images/default-art.svg';

import './details.scss';

export default function ArtDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const artworkId = Number(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget.src === defaultImage) return;
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="section--base art-details">
      <div className="container art-details__container">
        <div className="art-details__wrapper">
          <div className="art-details__image">
            <img
              src={data.image.src}
              alt={data.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultImage;
              }}
              className="art-details__image-img"
              onClick={openModal}
            />
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

      {isModalOpen && <LightBox src={data.image.src} alt={data.image.alt} onClose={closeModal} />}
    </section>
  );
}
