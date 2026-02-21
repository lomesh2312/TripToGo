import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trip, LandmarkOption, HostelOption, RestaurantOption, DishOption } from '../types';
import { MapPin, Calendar, DollarSign, Users, Clock, Utensils, Home, Backpack, Lightbulb, Loader, ArrowUpRight } from 'lucide-react';
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
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin text-forest-500 mx-auto mb-4" />
          <p className="text-olive-500 text-sm">Loading your trip…</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-sm">{error || 'Trip not found'}</p>
          <Link to="/plan" className="text-forest-500 hover:text-forest-600 text-sm flex items-center gap-1 justify-center">
            <span>← Plan a New Trip</span>
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
    <div className="min-h-screen bg-cream-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Hero card */}
        <div className="bg-cream-100 border border-cream-400 rounded-sm overflow-hidden mb-8 shadow-sm">
          <div className="relative h-56 md:h-80">
            <img
              src={getImageUrl(trip.destination, 'landscape')}
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-700/80 via-forest-700/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center space-x-1.5 text-cream-300 mb-2 text-xs uppercase tracking-widest">
                <MapPin className="h-3.5 w-3.5" />
                <span>{trip.destination}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-cream-100 mb-4 leading-tight">
                {tripPlan?.trip_name || trip.destination}
              </h1>
              <div className="flex flex-wrap gap-3">
                <Pill icon={<Calendar className="h-3.5 w-3.5" />} label={`${trip.days} Days`} />
                <Pill icon={<DollarSign className="h-3.5 w-3.5" />} label={trip.budget} />
                <Pill icon={<Users className="h-3.5 w-3.5" />} label={trip.travel_with} />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">

            {/* Overview */}
            {tripPlan?.overview && (
              <Section label="Overview">
                <div className="bg-cream-200 border border-cream-400 rounded-sm p-5">
                  <p className="text-forest-700 leading-relaxed italic text-sm">
                    "{tripPlan.overview}"
                  </p>
                  {tripPlan?.bestTimeToVisit && (
                    <div className="mt-4 flex items-center space-x-2 text-forest-600 text-xs font-medium">
                      <Clock className="h-4 w-4" />
                      <span>Best Time: {tripPlan.bestTimeToVisit}</span>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {/* Landmarks */}
            {tripPlan?.mustVisitPlaces && tripPlan.mustVisitPlaces.length > 0 && (
              <Section label="Must-Visit Landmarks">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tripPlan.mustVisitPlaces.map((place: LandmarkOption, idx: number) => (
                    <div key={idx} className="group bg-cream-200 border border-cream-400 rounded-sm overflow-hidden hover:border-forest-300 transition-colors">
                      <div className="h-44 overflow-hidden">
                        <img
                          src={getImageUrl(place.image_keyword || place.name, 'landmark')}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-serif font-bold text-forest-600 mb-1">{place.name}</h4>
                        <p className="text-olive-500 text-xs leading-relaxed">{place.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Hostels */}
            {tripPlan?.hostelOptions && tripPlan.hostelOptions.length > 0 && (
              <Section label="Recommended Stays">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {tripPlan.hostelOptions.map((hostel: HostelOption, idx: number) => (
                    <div key={idx} className="flex bg-cream-200 border border-cream-400 rounded-sm overflow-hidden hover:border-forest-300 transition-colors">
                      <div className="w-1/3 min-h-[140px]">
                        <img
                          src={getImageUrl(hostel.image_keyword || hostel.name, 'hostel')}
                          alt={hostel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 w-2/3 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-forest-600 mb-1 text-sm">{hostel.name}</h4>
                          <p className="text-forest-400 text-xs mb-2 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {hostel.location}
                          </p>
                          <p className="text-olive-500 text-xs line-clamp-2">{hostel.description}</p>
                        </div>
                        <div className="mt-3 text-forest-500 font-semibold text-sm">{hostel.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Dishes */}
            {tripPlan?.mustTryDishes && tripPlan.mustTryDishes.length > 0 && (
              <Section label="Must-Try Local Food">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {tripPlan.mustTryDishes.map((dish: DishOption, idx: number) => (
                    <div key={idx} className="text-center group">
                      <div className="aspect-square rounded-sm overflow-hidden mb-3 border border-cream-400 group-hover:border-forest-300 transition-colors">
                        <img
                          src={getImageUrl(dish.image_keyword || dish.name, 'food')}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-serif font-bold text-forest-600 text-sm">{dish.name}</h4>
                      <p className="text-xs text-olive-400 mt-0.5 line-clamp-2">{dish.description}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Restaurants */}
            {tripPlan?.famousRestaurants && tripPlan.famousRestaurants.length > 0 && (
              <Section label="Famous Restaurants">
                <div className="bg-cream-200 border border-cream-400 rounded-sm p-5">
                  <div className="space-y-4">
                    {tripPlan.famousRestaurants.map((res: RestaurantOption, idx: number) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 bg-cream-100 border border-cream-400 rounded-sm">
                        <div className="h-14 w-14 rounded-sm overflow-hidden flex-shrink-0">
                          <img
                            src={getImageUrl(res.image_keyword || res.name, 'restaurant')}
                            alt={res.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-forest-600 text-sm">{res.name}</h4>
                          <p className="text-forest-400 text-xs font-medium mb-1">{res.specialty}</p>
                          <p className="text-olive-500 text-xs">{res.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            )}

            {/* Daily Itinerary */}
            {tripPlan?.dailyItinerary && tripPlan.dailyItinerary.length > 0 && (
              <Section label="Day-by-Day Itinerary">
                <div className="space-y-6">
                  {tripPlan.dailyItinerary.map((day) => (
                    <div key={day.day} className="relative pl-10 border-l-2 border-cream-400 ml-4 pb-2">
                      <div className="absolute -left-5 top-0 bg-forest-500 text-cream-100 w-10 h-10 rounded-sm flex items-center justify-center font-bold font-serif shadow-md text-sm">
                        D{day.day}
                      </div>
                      <div className="bg-cream-100 border border-cream-400 rounded-sm p-5 hover:border-forest-300 transition-colors">
                        <h3 className="font-serif text-lg font-bold text-forest-600 mb-4">{day.title}</h3>
                        <div className="space-y-4">
                          {day.activities.map((activity, idx) => (
                            <div key={idx} className="flex items-start space-x-3 pb-4 border-b border-cream-300 last:border-0 last:pb-0">
                              <div className="text-forest-400 font-medium text-xs pt-0.5 w-16 flex-shrink-0 font-mono">
                                {activity.time}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-semibold text-forest-700 text-sm">{activity.activity}</h4>
                                  {activity.estimatedCost && (
                                    <span className="bg-forest-100 text-forest-600 text-xs font-medium px-2 py-0.5 rounded-sm ml-2 flex-shrink-0">
                                      {activity.estimatedCost}
                                    </span>
                                  )}
                                </div>
                                <p className="text-olive-500 text-xs leading-relaxed">{activity.description}</p>
                                {activity.duration && (
                                  <div className="flex items-center text-xs text-olive-400 mt-1.5 gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{activity.duration}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {(day.meals || day.accommodation) && (
                          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {day.meals && (
                              <div className="bg-cream-200 border border-cream-400 p-3 rounded-sm flex items-center space-x-2">
                                <Utensils className="h-4 w-4 text-forest-400 flex-shrink-0" />
                                <div className="text-xs">
                                  <span className="font-semibold text-forest-600 block">Meals</span>
                                  <span className="text-olive-500 line-clamp-1">{day.meals}</span>
                                </div>
                              </div>
                            )}
                            {day.accommodation && (
                              <div className="bg-cream-200 border border-cream-400 p-3 rounded-sm flex items-center space-x-2">
                                <Home className="h-4 w-4 text-forest-400 flex-shrink-0" />
                                <div className="text-xs">
                                  <span className="font-semibold text-forest-600 block">Stay</span>
                                  <span className="text-olive-500 line-clamp-1">{day.accommodation}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Packing + Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {tripPlan?.packingList && (
                <div className="bg-cream-200 border border-cream-400 rounded-sm p-5">
                  <h3 className="font-serif text-lg font-bold text-forest-600 mb-4 flex items-center gap-2">
                    <Backpack className="h-5 w-5 text-forest-400" />
                    <span>Packing List</span>
                  </h3>
                  <div className="space-y-2">
                    {tripPlan.packingList.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="h-1.5 w-1.5 bg-forest-400 rounded-full" />
                        <span className="text-forest-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tripPlan?.travelTips && (
                <div className="bg-cream-200 border border-cream-400 rounded-sm p-5">
                  <h3 className="font-serif text-lg font-bold text-forest-600 mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-forest-400" />
                    <span>Insider Tips</span>
                  </h3>
                  <div className="space-y-3">
                    {tripPlan.travelTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm">
                        <span className="text-forest-400 mt-0.5">→</span>
                        <p className="text-olive-600">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Total Cost */}
            {tripPlan?.estimatedTotalCost && (
              <div className="bg-forest-600 text-cream-100 p-8 rounded-sm text-center">
                <p className="text-forest-300 text-xs font-medium uppercase tracking-widest mb-2">Estimated Total Investment</p>
                <p className="font-serif text-5xl font-bold mb-1">{tripPlan.estimatedTotalCost}</p>
                <p className="text-forest-300 text-xs">Based on your preferences and selections</p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Link
                to="/plan"
                className="flex items-center space-x-2 bg-forest-500 text-cream-100 px-6 py-3 text-sm font-medium hover:bg-forest-400 transition-colors rounded-sm"
              >
                <span>Plan Another Trip</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center space-x-1.5 bg-cream-100/20 backdrop-blur-sm px-4 py-2 rounded-sm text-cream-100 border border-cream-100/20 text-xs capitalize">
    {icon}
    <span>{label}</span>
  </div>
);

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-5">
      <span className="w-1 h-6 bg-forest-500 rounded-full inline-block" />
      <h2 className="font-serif text-2xl font-bold text-forest-600">{label}</h2>
    </div>
    {children}
  </div>
);

export default TripDetailsPage;
