import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-white  p-4 shadow-md">
      <ul className="flex flex-col space-y-4 mt-5">
        <li className="flex items-center">
            <Link to="/">
            <FaHome size={30} className="mr-2 text-gray-600" />
            </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
