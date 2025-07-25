
const Menu = ({ onClose }) => {
    return (
      <div className="absolute top-14 right-0 w-48 bg-white rounded-md border border-gray-200 shadow-md z-50">
        <ul className="flex flex-col text-sm text-gray-700">
          <li>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Sign Out
            </button>
          </li>
          <li>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition"
              onClick={onClose}
            >
              Switch Account
            </button>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Menu;
  