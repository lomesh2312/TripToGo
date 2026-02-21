import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Compass, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/plan');
    }
  };

  return (
    <div className="min-h-screen bg-cream-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
          alt="Travel background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative max-w-md w-full">
        <div className="bg-cream-100 border border-cream-400 rounded-sm p-8 space-y-6 shadow-sm">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Compass className="h-10 w-10 text-forest-500" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-forest-600">Join TripToGo</h2>
            <p className="mt-2 text-olive-500 text-sm">Start planning your dream adventures</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-sm flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-olive-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-olive-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-cream-400 rounded-sm bg-cream-50 text-forest-700 text-sm focus:ring-1 focus:ring-forest-400 focus:border-forest-400 transition-all placeholder:text-olive-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-olive-600 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-olive-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-cream-400 rounded-sm bg-cream-50 text-forest-700 text-sm focus:ring-1 focus:ring-forest-400 focus:border-forest-400 transition-all placeholder:text-olive-300"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-1 text-xs text-olive-400">Must be at least 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-olive-600 mb-1.5 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle className="h-4 w-4 text-olive-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-cream-400 rounded-sm bg-cream-50 text-forest-700 text-sm focus:ring-1 focus:ring-forest-400 focus:border-forest-400 transition-all placeholder:text-olive-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-500 text-cream-100 py-3 px-4 rounded-sm text-sm font-medium hover:bg-forest-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cream-400" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-cream-100 text-olive-400">Already have an account?</span>
            </div>
          </div>

          <Link
            to="/login"
            className="block w-full text-center bg-cream-200 text-forest-600 py-2.5 px-4 rounded-sm text-sm font-medium hover:bg-cream-300 transition-colors duration-200 border border-cream-400"
          >
            Sign In
          </Link>
        </div>

        <p className="mt-5 text-center text-xs text-olive-400">
          <Link to="/" className="text-forest-500 hover:text-forest-600 font-medium">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};
