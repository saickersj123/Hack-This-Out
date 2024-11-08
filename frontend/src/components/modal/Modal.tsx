import React, { ReactNode, useEffect } from 'react';
import '../../assets/scss/etc/Modal.scss';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * A reusable Modal component.
 * 
 * Closes the modal when the user clicks outside the modal content or presses the Escape key.
 * 
 * @param {ModalProps} props - The props for the Modal component.
 * @returns {JSX.Element | null} The rendered Modal component or null if not open.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Handle pressing the Escape key to close the modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close Modal">
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
