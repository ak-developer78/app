import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 id="modal-title" className="text-2xl font-bold text-text-primary">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 text-3xl leading-none font-semibold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
