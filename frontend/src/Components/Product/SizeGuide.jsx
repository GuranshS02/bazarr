import React, { useState, useEffect } from 'react';

const SizeGuideDrawer = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Trigger slide-in after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10); // small delay to allow transition to apply
    return () => clearTimeout(timer);
  }, []);

  // Handle smooth slide-out then close
  const handleClose = () => {
    setIsClosing(true);
    setIsOpen(false);
  };

  // Unmount after slide-out transition
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // matches duration-300
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>

      {/* Drawer panel */}
      <div
        className={`
          ml-auto w-full max-w-md bg-white h-full shadow-lg p-6 overflow-y-auto z-50 relative
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* Content */}
        <h2 className="text-2xl font-bold mb-4">Size Guide</h2>
        <p className="mb-4 text-gray-700">
          Use this chart to find the perfect fit for your body measurements. All sizes are in inches.
        </p>

        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">Chest</th>
              <th className="border px-4 py-2">Shoulder</th>
              <th className="border px-4 py-2">Length</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">S</td><td className="border px-4 py-2">36-38"</td><td className="border px-4 py-2">17"</td><td className="border px-4 py-2">27"</td></tr>
            <tr><td className="border px-4 py-2">M</td><td className="border px-4 py-2">38-40"</td><td className="border px-4 py-2">18"</td><td className="border px-4 py-2">28"</td></tr>
            <tr><td className="border px-4 py-2">L</td><td className="border px-4 py-2">40-42"</td><td className="border px-4 py-2">19"</td><td className="border px-4 py-2">29"</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeGuideDrawer;
