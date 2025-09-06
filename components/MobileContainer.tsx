
import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({
  children
}) => {
  return (
    <div className="mobile-container bg-gray-50">
      {children}
    </div>
  );
};

export default MobileContainer;
