import useModal from '@/hooks/useModal';

interface LightBoxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function LightBox({ src, alt, onClose }: LightBoxProps) {
  useModal({ onClose: onClose });

  return (
    <div className="modal" onClick={onClose}>
      <img src={src} alt={alt} className="modal-image" onClick={(e) => e.stopPropagation()} />
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}
