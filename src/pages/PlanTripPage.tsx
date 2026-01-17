import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Calendar, DollarSign, Users, Sparkles, Loader, User, UsersRound, Heart } from 'lucide-react';
import { TripFormData } from '../types';
import { API_BASE_URL } from '../config';

interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export const PlanTripPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<TripFormData>({
    destination: '',
    days: 3,
    budget: 'moderate',
    travelWith: 'alone',
    travelerCount: 1,
  });
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: formData.destination,
          days: formData.days,
          budget: formData.budget,
          travelers: formData.travelWith === 'alone' ? 1 :
            formData.travelWith === 'couple' ? 2 :
              (formData.travelerCount || 4),
          travelWith: formData.travelWith,
          interests: 'general tourism',
          userId: user?.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate trip');
      }

      if (data.tripId) {
        navigate(`/trip/${data.tripId}`);
      } else {
        throw new Error('No trip ID returned from server');
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Perfect Trip
            </span>
          </h1>
          <p className="text-xl text-gray-600">Tell us about your dream destination and let our engine build your itinerary</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-2 relative">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                <MapPin className="h-6 w-6 text-cyan-600" />
                <span>Where do you want to go?</span>
              </label>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({ ...formData, destination: val });
                  fetchSuggestions(val);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => formData.destination.length >= 3 && setShowSuggestions(true)}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="e.g., Paris, Tokyo, New York..."
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white mt-1 border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, destination: item.display_name });
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-cyan-50 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <p className="text-gray-900 font-medium truncate">{item.display_name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                <Calendar className="h-6 w-6 text-cyan-600" />
                <span>How many days?</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl text-xl font-bold min-w-[80px] text-center">
                  {formData.days}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                <DollarSign className="h-6 w-6 text-cyan-600" />
                <span>What's your budget?</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BudgetOption
                  selected={formData.budget === 'cheap'}
                  onClick={() => setFormData({ ...formData, budget: 'cheap' })}
                  title="Budget"
                  description="Save money while exploring"
                  color="from-green-400 to-emerald-500"
                />
                <BudgetOption
                  selected={formData.budget === 'moderate'}
                  onClick={() => setFormData({ ...formData, budget: 'moderate' })}
                  title="Moderate"
                  description="Balanced comfort & cost"
                  color="from-blue-400 to-cyan-500"
                />
                <BudgetOption
                  selected={formData.budget === 'luxury'}
                  onClick={() => setFormData({ ...formData, budget: 'luxury' })}
                  title="Luxury"
                  description="Premium experiences"
                  color="from-yellow-400 to-orange-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                <Users className="h-6 w-6 text-cyan-600" />
                <span>Who are you traveling with?</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TravelOption
                  selected={formData.travelWith === 'alone'}
                  onClick={() => setFormData({ ...formData, travelWith: 'alone' })}
                  icon={<User className="h-8 w-8" />}
                  title="Solo"
                />
                <TravelOption
                  selected={formData.travelWith === 'couple'}
                  onClick={() => setFormData({ ...formData, travelWith: 'couple' })}
                  icon={<Heart className="h-8 w-8" />}
                  title="Couple"
                />
                <TravelOption
                  selected={formData.travelWith === 'family'}
                  onClick={() => setFormData({ ...formData, travelWith: 'family' })}
                  icon={<UsersRound className="h-8 w-8" />}
                  title="Family"
                />
                <TravelOption
                  selected={formData.travelWith === 'friends'}
                  onClick={() => setFormData({ ...formData, travelWith: 'friends' })}
                  icon={<Users className="h-8 w-8" />}
                  title="Friends"
                />
              </div>

              {(formData.travelWith === 'family' || formData.travelWith === 'friends') && (
                <div className="mt-4 p-6 bg-cyan-50 rounded-2xl animate-in fade-in slide-in-from-top-4">
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Number of travelers:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.travelerCount}
                    onChange={(e) => setFormData({ ...formData, travelerCount: parseInt(e.target.value) })}
                    className="w-full md:w-48 px-4 py-3 border-2 border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-5 px-8 rounded-xl text-xl font-bold hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <Loader className="h-6 w-6 animate-spin" />
                  <span>Generating Your Perfect Trip...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6" />
                  <span>Generate My Trip</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface BudgetOptionProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  color: string;
}

const BudgetOption = ({ selected, onClick, title, description, color }: BudgetOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${selected
      ? `border-transparent bg-gradient-to-r ${color} text-white shadow-xl scale-105`
      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
      }`}
  >
    <div className="text-center">
      <div className={`text-2xl font-bold mb-1 ${selected ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </div>
      <div className={`text-sm ${selected ? 'text-white/90' : 'text-gray-600'}`}>
        {description}
      </div>
    </div>
  </button>
);

interface TravelOptionProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
}

const TravelOption = ({ selected, onClick, icon, title }: TravelOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${selected
      ? 'border-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-xl scale-105'
      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg text-gray-700'
      }`}
  >
    {icon}
    <span className="font-semibold">{title}</span>
  </button>
);
