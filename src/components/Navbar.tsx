import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Compass, LogOut, Map } from 'lucide-react';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-cream-200/90 backdrop-blur-sm border-b border-cream-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Compass className="h-6 w-6 text-forest-500 group-hover:rotate-45 transition-transform" />
            <span className="font-serif text-xl font-bold text-forest-600">TripToGo</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-olive-500">
            <Link to="/" className="hover:text-forest-500 transition-colors">Home</Link>
            <Link to="#about" className="hover:text-forest-500 transition-colors">About</Link>
            <Link to="#services" className="hover:text-forest-500 transition-colors">Services</Link>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to="/plan"
                  className="flex items-center space-x-2 bg-forest-500 text-cream-100 px-4 py-2 text-sm font-medium rounded-sm"
                >
                  <Map className="h-4 w-4" />
                  <span>Plan Trip</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1.5 text-olive-500 hover:text-forest-600 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-olive-500 hover:text-forest-600 px-3 py-2 text-sm">Login</Link>
                <Link
                  to="/signup"
                  className="bg-forest-500 text-cream-100 px-5 py-2 text-sm font-medium rounded-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
