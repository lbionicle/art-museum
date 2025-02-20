import './small.scss';

export default function SmallCardSkeleton() {
  return (
    <div className="card card--small skeleton">
      <div className="card__image skeleton__image" />
      <div className="card__info">
        <div className="skeleton__text skeleton__text--title" />
        <div className="skeleton__text skeleton__text--artist" />
        <div className="skeleton__text skeleton__text--status" />
      </div>
    </div>
  );
}
