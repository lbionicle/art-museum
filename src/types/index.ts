export type SortField = 'title' | 'date';
export type SortOrder = 'asc' | 'desc';

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

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}
