import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

function Modal({ isOpen, onClose, title, children }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Handles closing modal with Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      // Prevents background scrolling when modal is open
      document.body.style.overflow = "hidden";

      // Focus modal for accessibility
      modalRef.current?.focus();
    }

    return () => {
      // Cleanup event listener and restore scroll
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Doesn't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose} // Close when clicking outside modal
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          tabIndex={-1} // Makes div focusable
        >
          <div className="flex justify-between mb-4">
            <h2 id="modal-title"  className="text-xl font-bold">{title}</h2>

            {/* Close button */}
            <button onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal">
              <X />
            </button>
          </div>

          {/* Modal content */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
