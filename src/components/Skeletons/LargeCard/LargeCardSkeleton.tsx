import './large.scss';

export default function LargeCardSkeleton() {
  return (
    <div className="card card--large skeleton">
      <div className="card__image-container">
        <div className="card__image skeleton__image" />
      </div>
    </div>
  );
}
