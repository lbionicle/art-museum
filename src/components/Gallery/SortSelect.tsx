import { SortConfig, SortField, SortOrder } from '@/types';

interface SortSelectProps {
  value: SortConfig;
  // eslint-disable-next-line no-unused-vars
  onChange: (config: SortConfig) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const options = [
    {
      value: 'title_asc',
      label: 'A-Z',
      title: 'By title (A → Z)',
    },
    {
      value: 'title_desc',
      label: 'Z-A',
      title: 'By title (Z → A)',
    },
    {
      value: 'date_desc',
      label: 'New',
      title: 'Newest first',
    },
    {
      value: 'date_asc',
      label: 'Old',
      title: 'Oldest first',
    },
  ];

  const handleSelect = (value: string) => {
    const [field, order] = value.split('_') as [SortField, SortOrder];
    onChange({ field, order });
  };

  return (
    <div className="sort-toggle-group">
      <span className="sort-label">Sorted by:</span>
      <div className="sort-buttons">
        {options.map((option) => {
          const isActive = option.value === `${value.field}_${value.order}`;
          return (
            <button
              key={option.value}
              title={option.title}
              className={`sort-button ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
