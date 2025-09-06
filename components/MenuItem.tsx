
import React from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, link }) => {
  return (
    <Link to={link} className="menu-item">
      <div className="flex items-center">
        <div className="mr-4 text-gray-400">{icon}</div>
        <div className="text-gray-800">{title}</div>
      </div>
      <div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </Link>
  );
};

export default MenuItem;
