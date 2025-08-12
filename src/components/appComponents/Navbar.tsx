import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { to: '/', label: 'Preview' },
    { to: '/create', label: 'New Email' },
  ];
  return (
    <nav className="bg-linear-to-r from-vsRed via-vsRed to-vsPurple px-2 text-vsWhite shadow-md shadow-black/20 mb-4">
      <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
        <Link to={'/'}>
          <h1 id="navbar-title" className="text-vsWhite">
            VOIS Email Builder
          </h1>
        </Link>
        <ul className="flex space-x-4 ml-6 font-medium">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-3 py-2 hover:opacity-75 ${
                  location.pathname === to ? 'border-b-2' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
