import { CardProps } from '../Card/SmallCard';
import SmallCard from '../Card/SmallCard';
import LargeCard from '../Card/LargeCard';
import './table.scss';

interface TableProps {
  cards: CardProps[];
  title?: string;
  subtitle?: string;
  variant: 'small' | 'large';
}

export default function Table({ cards, title, subtitle, variant }: TableProps) {
  const CardComponent = variant === 'small' ? SmallCard : LargeCard;

  return (
    <section className="section--base">
      <div className="container">
        {subtitle && <h6 className="subtitle">{subtitle}</h6>}
        {title && <h2 className="title">{title}</h2>}
        <div className={`table table--${variant}`}>
          {cards.map((card) => (
            <CardComponent key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
