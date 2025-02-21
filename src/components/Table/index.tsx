import { ReactNode } from 'react';
import './table.scss';

interface TableProps {
  variant: 'small' | 'large';
  children: ReactNode;
}

export default function Table({ children, variant }: TableProps) {
  return <div className={`table table--${variant}`}>{children}</div>;
}
