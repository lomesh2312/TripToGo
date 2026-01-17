import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trip, LandmarkOption, HostelOption, RestaurantOption, DishOption } from '../types';
import { MapPin, Calendar, DollarSign, Users, Clock, Utensils, Home, Backpack, Lightbulb, Loader } from 'lucide-react';
import { API_BASE_URL } from '../config';

export const TripDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/trips/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Trip not found');
        }

        setTrip(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading your trip...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error || 'Trip not found'}</p>
          <Link to="/plan" className="text-cyan-600 hover:text-cyan-700">
            ← Plan a New Trip
          </Link>
        </div>
      </div>
    );
  }

  const getImageUrl = (keyword: string, category: string) => {
    const destination = trip.destination.split(',')[0].trim();
    const simpleKeyword = keyword.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    const simpleDest = destination.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    const seed = keyword.length + category.length;
    return `https://loremflickr.com/800/600/${simpleKeyword},${simpleDest},${category}?lock=${seed}`;
  };

  const tripPlan = trip.trip_plan;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img
              src={getImageUrl(trip.destination, 'landscape')}
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold tracking-wide uppercase">{trip.destination}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                {tripPlan?.trip_name || trip.destination}
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white border border-white/20">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                  <span className="font-medium">{trip.days} Days</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white border border-white/20">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="capitalize font-medium">{trip.budget}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white border border-white/20">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="capitalize font-medium">{trip.travel_with}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {tripPlan?.overview && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                  <span>Trip Overview</span>
                </h2>
                <div className="bg-cyan-50/50 p-8 rounded-3xl border border-cyan-100">
                  <p className="text-gray-700 text-xl leading-relaxed italic">
                    "{tripPlan.overview}"
                  </p>
                  {tripPlan?.bestTimeToVisit && (
                    <div className="mt-6 flex items-center space-x-2 text-cyan-800 font-semibold">
                      <Clock className="h-5 w-5" />
                      <span>Best Time to Visit: {tripPlan.bestTimeToVisit}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Landmarks & Must Visit Places */}
            {tripPlan?.mustVisitPlaces && tripPlan.mustVisitPlaces.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                  <span className="w-2 h-8 bg-purple-600 rounded-full"></span>
                  <span>Must-Visit Landmarks</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tripPlan.mustVisitPlaces.map((place: LandmarkOption, idx: number) => (
                    <div key={idx} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={getImageUrl(place.image_keyword || place.name, 'landmark')}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                          <h4 className="text-white font-bold text-xl">{place.name}</h4>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600">{place.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hostel Options */}
            {tripPlan?.hostelOptions && tripPlan.hostelOptions.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                  <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                  <span>Recommended Hostels</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tripPlan.hostelOptions.map((hostel: HostelOption, idx: number) => (
                    <div key={idx} className="flex bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="w-1/3 min-h-[160px]">
                        <img
                          src={getImageUrl(hostel.image_keyword || hostel.name, 'hostel')}
                          alt={hostel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 w-2/3 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-xl text-gray-900 mb-1">{hostel.name}</h4>
                          <p className="text-cyan-600 font-medium mb-3 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" /> {hostel.location}
                          </p>
                          <p className="text-gray-600 text-sm line-clamp-2">{hostel.description}</p>
                        </div>
                        <div className="mt-4 text-green-600 font-bold text-lg">
                          {hostel.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Must Try Dishes */}
            {tripPlan?.mustTryDishes && tripPlan.mustTryDishes.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                  <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
                  <span>Must-Try Local Food</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {tripPlan.mustTryDishes.map((dish: DishOption, idx: number) => (
                    <div key={idx} className="text-center group">
                      <div className="relative aspect-square rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg group-hover:border-orange-200 transition-colors">
                        <img
                          src={getImageUrl(dish.image_keyword || dish.name, 'food')}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-bold text-gray-900">{dish.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dish.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Famous Restaurants */}
            {tripPlan?.famousRestaurants && tripPlan.famousRestaurants.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                  <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                  <span>Famous Restaurants</span>
                </h2>
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <div className="space-y-6">
                    {tripPlan.famousRestaurants.map((res: RestaurantOption, idx: number) => (
                      <div key={idx} className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm">
                        <div className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={getImageUrl(res.image_keyword || res.name, 'restaurant')}
                            alt={res.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{res.name}</h4>
                          <p className="text-sm font-semibold text-orange-600 mb-1">{res.specialty}</p>
                          <p className="text-sm text-gray-600">{res.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tripPlan?.dailyItinerary && tripPlan.dailyItinerary.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                  <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                  <span>Adventure Timeline</span>
                </h2>
                <div className="space-y-12">
                  {tripPlan.dailyItinerary.map((day) => (
                    <div key={day.day} className="relative pl-12 border-l-2 border-dashed border-cyan-200 ml-4 pb-4">
                      <div className="absolute -left-7 top-0 bg-gradient-to-br from-cyan-500 to-blue-600 text-white w-14 h-14 rounded-3xl flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-200 rotate-12 group-hover:rotate-0 transition-transform">
                        D{day.day}
                      </div>
                      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:border-cyan-200 transition-colors">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{day.title}</h3>

                        <div className="space-y-6">
                          {day.activities.map((activity, idx) => (
                            <div key={idx} className="group relative">
                              <div className="flex items-start space-x-4">
                                <div className="text-cyan-600 font-bold text-sm pt-1 w-20 flex-shrink-0">
                                  {activity.time}
                                </div>
                                <div className="flex-1 pb-6 border-b border-gray-50 group-last:border-0 group-last:pb-0">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-cyan-600 transition-colors">
                                      {activity.activity}
                                    </h4>
                                    {activity.estimatedCost && (
                                      <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {activity.estimatedCost}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-600 leading-relaxed mb-3">{activity.description}</p>
                                  {activity.duration && (
                                    <div className="flex items-center text-sm text-gray-400">
                                      <Clock className="h-4 w-4 mr-1 text-gray-300" />
                                      <span>{activity.duration}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {(day.meals || day.accommodation) && (
                          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {day.meals && (
                              <div className="bg-orange-50/50 p-4 rounded-2xl flex items-center space-x-3">
                                <Utensils className="h-5 w-5 text-orange-600 flex-shrink-0" />
                                <div className="text-sm">
                                  <span className="font-bold text-orange-900 block">Meals</span>
                                  <span className="text-orange-800 line-clamp-1">{day.meals}</span>
                                </div>
                              </div>
                            )}
                            {day.accommodation && (
                              <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center space-x-3">
                                <Home className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <div className="text-sm">
                                  <span className="font-bold text-blue-900 block">Stay</span>
                                  <span className="text-blue-800 line-clamp-1">{day.accommodation}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {tripPlan?.packingList && (
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-blue-100 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                    <Backpack className="h-7 w-7 text-indigo-600" />
                    <span>Adventure Pack</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {tripPlan.packingList.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3 bg-white/60 p-3 rounded-xl">
                        <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tripPlan?.travelTips && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-100 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                    <Lightbulb className="h-7 w-7 text-emerald-600" />
                    <span>Insider Tips</span>
                  </h3>
                  <div className="space-y-4">
                    {tripPlan.travelTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <span className="text-xl leading-none">✨</span>
                        <p className="text-emerald-900 font-medium">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {tripPlan?.estimatedTotalCost && (
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-10 rounded-3xl text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full -ml-12 -mb-12"></div>
                <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">Investment in Memories</p>
                <p className="text-5xl font-black mb-2">{tripPlan.estimatedTotalCost}</p>
                <p className="text-gray-400 text-sm">Estimated total based on your preferences</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
