import { useEffect } from 'react';

interface UseModalProps {
  onClose: () => void;
}

export default function useModal({ onClose }: UseModalProps) {
  useEffect(() => {
    const originOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
}
