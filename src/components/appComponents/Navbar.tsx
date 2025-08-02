import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const navItems = [
        {to: "/", label: "Preview"},
        {to: "/create", label: "New Email"},
    ]
    return ( 
        <nav className="bg-white shadow-md border-b border-sky-100">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
                <h1 id="navbar-title" className="text-sky-700 tracking-tight">Email Builder</h1>
                <ul className="flex space-x-4 ml-6">
                    {navItems.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    location.pathname === to
                                        ? "bg-sky-100 text-sky-700"
                                        : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
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
}
 
export default Navbar;