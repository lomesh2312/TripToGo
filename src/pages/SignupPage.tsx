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
      return setError('Min 6 chars</h4>');
    }

    setLoading(true);
    const { error: err } = await signUp(email, password);

    if (err) {
      setError(err.message);
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
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative max-w-md w-full">
        <div className="bg-cream-100 border border-cream-400 rounded-sm p-8 space-y-6 shadow-sm">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Compass className="h-10 w-10 text-forest-500" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-forest-600">Join</h2>
            <p className="mt-2 text-olive-500 text-sm">Start your adventure</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-sm flex items-center space-x-2 text-red-700 text-sm">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-olive-600 mb-1.5 uppercase">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-olive-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-cream-400 rounded-sm bg-cream-50 text-forest-700 text-sm focus:ring-1 focus:ring-forest-400 transition-all placeholder:text-olive-300"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-olive-600 mb-1.5 uppercase">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-olive-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-cream-400 rounded-sm bg-cream-50 text-forest-700 text-sm focus:ring-1 focus:ring-forest-400 transition-all placeholder:text-olive-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-olive-600 mb-1.5 uppercase">Confirm</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle className="h-4 w-4 text-olive-400" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-cream-400 rounded-sm bg-cream-50 text-forest-700 text-sm focus:ring-1 focus:ring-forest-400 transition-all placeholder:text-olive-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-500 text-cream-100 py-3 px-4 rounded-sm text-sm font-medium hover:bg-forest-400 transition-colors disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center">
            <Link to="/login" className="text-xs text-olive-500 hover:text-forest-600 transition-colors">
              Already have an account? Sign In
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center text-xs">
          <Link to="/" className="text-olive-400 hover:underline">← Home</Link>
        </p>
      </div>
    </div>
  );
};
