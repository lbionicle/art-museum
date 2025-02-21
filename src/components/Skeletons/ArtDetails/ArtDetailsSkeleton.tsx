import './details.scss';

export default function ArtDetailsSkeleton() {
  return (
    <section className="section--base art-details">
      <div className="container art-details__container">
        <div className="art-details__wrapper">
          <div className="art-details__image">
            <div className="art-details__image-skeleton art-details-skeleton" />
          </div>
          <div className="art-details__info">
            <div className="art-details__header">
              <div
                className="art-details-skeleton art-details-skeleton-text"
                style={{ width: '100%', margin: 0 }}
              />
              <div
                className="art-details-skeleton art-details-skeleton-text"
                style={{ width: '60%' }}
              />
              <div
                className="art-details-skeleton art-details-skeleton-text"
                style={{ width: '40%' }}
              />
            </div>
            <div className="art-details__overview">
              <div className="art-details-skeleton art-details-skeleton-title" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="art-details-skeleton art-details-skeleton-text" />
              ))}
              <div className="art-details-skeleton art-details-skeleton-status" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
