import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Calendar, DollarSign, Users, Loader, User, UsersRound, Heart, ArrowUpRight } from 'lucide-react';
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
          userId: user?.id,
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
    <div className="min-h-screen bg-cream-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <p className="text-[10px] font-medium tracking-[0.2em] text-olive-400 uppercase mb-2 flex items-center gap-2">
            <span className="w-4 h-px bg-olive-400 inline-block" />
            Plan Your Journey
          </p>
          <h1 className="font-serif text-5xl font-bold text-forest-600 mb-3">
            Design Your<br />Perfect Trip
          </h1>
          <p className="text-olive-500 text-sm leading-relaxed max-w-md">
            Tell us about your dream destination and let our AI engine build a bespoke itinerary for you.
          </p>
        </div>

        <div className="bg-cream-100 border border-cream-400 rounded-sm p-8 md:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-sm text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Destination */}
            <div className="space-y-2 relative">
              <label className="flex items-center space-x-2 text-xs font-medium text-olive-600 uppercase tracking-wide">
                <MapPin className="h-4 w-4 text-forest-400" />
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
                className="w-full px-4 py-3 border border-cream-400 rounded-sm bg-cream-50 text-forest-700 text-sm focus:ring-1 focus:ring-forest-400 focus:border-forest-400 transition-all placeholder:text-olive-300"
                placeholder="e.g., Paris, Tokyo, Santorini…"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-cream-100 mt-1 border border-cream-400 rounded-sm shadow-lg max-h-60 overflow-auto">
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, destination: item.display_name });
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-cream-200 border-b border-cream-300 last:border-0 transition-colors text-sm text-forest-700"
                    >
                      {item.display_name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Days */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-xs font-medium text-olive-600 uppercase tracking-wide">
                <Calendar className="h-4 w-4 text-forest-400" />
                <span>How many days?</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                  className="flex-1 h-1.5 bg-cream-400 rounded-full appearance-none cursor-pointer accent-forest-500"
                />
                <div className="bg-forest-500 text-cream-100 px-5 py-2.5 rounded-sm text-lg font-bold min-w-[64px] text-center font-serif">
                  {formData.days}
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-xs font-medium text-olive-600 uppercase tracking-wide">
                <DollarSign className="h-4 w-4 text-forest-400" />
                <span>What's your budget?</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                <BudgetOption
                  selected={formData.budget === 'cheap'}
                  onClick={() => setFormData({ ...formData, budget: 'cheap' })}
                  title="Budget"
                  description="Save while exploring"
                />
                <BudgetOption
                  selected={formData.budget === 'moderate'}
                  onClick={() => setFormData({ ...formData, budget: 'moderate' })}
                  title="Moderate"
                  description="Balanced comfort & cost"
                />
                <BudgetOption
                  selected={formData.budget === 'luxury'}
                  onClick={() => setFormData({ ...formData, budget: 'luxury' })}
                  title="Luxury"
                  description="Premium experiences"
                />
              </div>
            </div>

            {/* Travel With */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-xs font-medium text-olive-600 uppercase tracking-wide">
                <Users className="h-4 w-4 text-forest-400" />
                <span>Who are you traveling with?</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <TravelOption
                  selected={formData.travelWith === 'alone'}
                  onClick={() => setFormData({ ...formData, travelWith: 'alone' })}
                  icon={<User className="h-6 w-6" />}
                  title="Solo"
                />
                <TravelOption
                  selected={formData.travelWith === 'couple'}
                  onClick={() => setFormData({ ...formData, travelWith: 'couple' })}
                  icon={<Heart className="h-6 w-6" />}
                  title="Couple"
                />
                <TravelOption
                  selected={formData.travelWith === 'family'}
                  onClick={() => setFormData({ ...formData, travelWith: 'family' })}
                  icon={<UsersRound className="h-6 w-6" />}
                  title="Family"
                />
                <TravelOption
                  selected={formData.travelWith === 'friends'}
                  onClick={() => setFormData({ ...formData, travelWith: 'friends' })}
                  icon={<Users className="h-6 w-6" />}
                  title="Friends"
                />
              </div>

              {(formData.travelWith === 'family' || formData.travelWith === 'friends') && (
                <div className="mt-3 p-4 bg-cream-200 border border-cream-400 rounded-sm">
                  <label className="block text-xs font-medium text-olive-600 mb-2 uppercase tracking-wide">
                    Number of travelers:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.travelerCount}
                    onChange={(e) => setFormData({ ...formData, travelerCount: parseInt(e.target.value) })}
                    className="w-full md:w-36 px-3 py-2 border border-cream-400 rounded-sm bg-cream-100 text-forest-700 text-sm focus:ring-1 focus:ring-forest-400 focus:border-forest-400 transition-all"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-500 text-cream-100 py-4 px-8 rounded-sm text-sm font-semibold hover:bg-forest-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Generating Your Perfect Trip…</span>
                </>
              ) : (
                <>
                  <span>Generate My Trip</span>
                  <ArrowUpRight className="h-5 w-5" />
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
}

const BudgetOption = ({ selected, onClick, title, description }: BudgetOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-4 rounded-sm border-2 transition-all duration-200 text-left ${selected
        ? 'border-forest-500 bg-forest-500 text-cream-100'
        : 'border-cream-400 bg-cream-100 hover:border-forest-300 text-forest-700'
      }`}
  >
    <div className={`text-sm font-semibold mb-0.5 ${selected ? 'text-cream-100' : 'text-forest-600'}`}>
      {title}
    </div>
    <div className={`text-xs ${selected ? 'text-cream-300' : 'text-olive-500'}`}>
      {description}
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
    className={`py-4 px-3 rounded-sm border-2 transition-all duration-200 flex flex-col items-center space-y-1.5 ${selected
        ? 'border-forest-500 bg-forest-500 text-cream-100'
        : 'border-cream-400 bg-cream-100 hover:border-forest-300 text-olive-600'
      }`}
  >
    {icon}
    <span className="text-xs font-semibold">{title}</span>
  </button>
);
