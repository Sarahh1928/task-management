import React from 'react';
import { List, Home, Calendar, Settings, PlusCircle, ChevronLeft, ChevronRight, Search, CheckCircle, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './taskflow-styles.css';

const Sidebar = ({ onCategorySelect, searchQuery, onSearchChange }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const navigate = useNavigate();


  const getIconSize = () => (isOpen ? 20 : 30); 

  const categories = [
    { name: 'Work', icon: <List size={getIconSize()} /> },
    { name: 'Personal', icon: <Home size={getIconSize()} /> },
    { name: 'Shopping', icon: <List size={getIconSize()} /> },
    { name: 'Health', icon: <List size={getIconSize()} /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const AddTask = () => {
    navigate('/newTask');
  };

  const handleCategoryClick = (category) => {
    navigate('/');
    onCategorySelect(category);
  };

  return (
    <div className={`relative ${isOpen ? 'w-64' : 'w-30'} transition-all duration-300 ease-in-out`}>
      <div className={`h-screen bg-gray-800 text-white p-4 ${isOpen ? '' : 'items-left'} overflow-y-auto`}>
        {isOpen && <h1 className="text-2xl font-bold mb-6">TaskFlow</h1>}

        {isOpen && (
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery} 
              onChange={(e) => onSearchChange(e.target.value)} 
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded py-2 px-4 pr-10"
            />
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        )}

        <nav >
          <ul style={{padding:0}}>
            <li className="mb-4">
              <a href="/" className="flex items-center text-gray-300 hover:text-white">
                <Home size={getIconSize()} className="mr-2" />
                {isOpen && <span>Dashboard</span>}
              </a>
            </li>
            <li className="mb-4">
              <a href="/calendar" onClick={() => handleCategoryClick("calendar")} className="flex items-center text-gray-300 hover:text-white">
                <Calendar size={getIconSize()} className="mr-2" />
                {isOpen && <span>Calendar</span>}
              </a>
            </li>
            <li className="mb-4">
              <button onClick={() => handleCategoryClick("active")} className="flex items-center text-gray-300 hover:text-white">
                <Circle size={getIconSize()} className="mr-2" />
                {isOpen && <span>Active Tasks</span>}
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleCategoryClick("completed")} className="flex items-center text-gray-300 hover:text-white">
                <CheckCircle size={getIconSize()} className="mr-2" />
                {isOpen && <span>Completed Tasks</span>}
              </button>
            </li>
          </ul>
        </nav>

        {isOpen && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <ul>
              {categories.map((category, index) => (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex items-center text-gray-300 hover:text-white w-full"
                  >
                    {React.cloneElement(category.icon, { className: `mr-2 ${!isOpen && 'mx-auto'}` })}
                    {isOpen && <span className="ml-2">{category.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className={`mt-8 ${isOpen ? 'w-full py-2 px-4' : 'w-8 h-8'} bg-blue-500 hover:bg-blue-600 text-white font-bold rounded flex items-center justify-center`} onClick={AddTask}>
          <PlusCircle size={isOpen ? getIconSize() : 25} className={isOpen ? 'mr-2' : ''} />
          {isOpen && <span>New Task</span>}
        </button>

        <div className="absolute bottom-4 left-4">
          <a href="/settings" className="flex items-center text-gray-300 hover:text-white">
            <Settings size={getIconSize()} className={`mr-2 ${!isOpen && 'mx-auto'}`} />
            {isOpen && <span>Settings</span>}
          </a>
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;