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
        const response = await fetch(`${API_BASE_URL}/api/trips/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Not found');
        setTrip(data);
      } catch (err: any) {
        setError(err.message || 'Error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <Loader className="h-10 w-10 animate-spin text-forest-500" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/plan" className="text-forest-500 text-sm italic underline">Start Over</Link>
        </div>
      </div>
    );
  }

  const getImageUrl = (keyword: string, category: string) => {
    const dest = trip.destination.split(',')[0].trim();
    const sK = keyword.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    const sD = dest.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    return `https://loremflickr.com/800/600/${sK},${sD},${category}?lock=${keyword.length}`;
  };

  const plan = trip.trip_plan;

  return (
    <div className="min-h-screen bg-cream-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-cream-100 border border-cream-400 rounded-sm overflow-hidden mb-8 shadow-sm">
          <div className="relative h-56 md:h-80">
            <img
              src={getImageUrl(trip.destination, 'landscape')}
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-700/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center space-x-1.5 text-cream-300 mb-2 text-xs uppercase">
                <MapPin className="h-3.5 w-3.5" />
                <span>{trip.destination}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-cream-100 mb-4">
                {plan?.trip_name || trip.destination}
              </h1>
              <div className="flex flex-wrap gap-3">
                <Pill icon={<Calendar className="h-3.5 w-3.5" />} label={`${trip.days} Days`} />
                <Pill icon={<DollarSign className="h-3.5 w-3.5" />} label={trip.budget} />
                <Pill icon={<Users className="h-3.5 w-3.5" />} label={trip.travel_with} />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {plan?.overview && (
              <Section label="Overview">
                <div className="bg-cream-200 border border-cream-400 rounded-sm p-5">
                  <p className="text-forest-700 italic text-sm">"{plan.overview}"</p>
                </div>
              </Section>
            )}

            {plan?.mustVisitPlaces && plan.mustVisitPlaces.length > 0 && (
              <Section label="Landmarks">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {plan.mustVisitPlaces.map((place: LandmarkOption, idx: number) => (
                    <div key={idx} className="bg-cream-200 border border-cream-400 rounded-sm overflow-hidden">
                      <img src={getImageUrl(place.name, 'landmark')} className="h-40 w-full object-cover" />
                      <div className="p-4">
                        <h4 className="font-serif font-bold text-forest-600 text-sm">{place.name}</h4>
                        <p className="text-olive-500 text-[10px] mt-1">{place.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {plan?.hostelOptions && plan.hostelOptions.length > 0 && (
              <Section label="Stays">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {plan.hostelOptions.map((h: HostelOption, idx: number) => (
                    <div key={idx} className="flex bg-cream-200 border border-cream-400 rounded-sm overflow-hidden">
                      <div className="w-1/3">
                        <img src={getImageUrl(h.name, 'hostel')} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-4 w-2/3">
                        <h4 className="font-serif font-bold text-forest-600 text-sm">{h.name}</h4>
                        <p className="text-olive-500 text-[10px] line-clamp-2">{h.description}</p>
                        <div className="mt-2 text-forest-500 font-bold text-sm">{h.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {plan?.dailyItinerary && (
              <Section label="Itinerary">
                <div className="space-y-6">
                  {plan.dailyItinerary.map((day) => (
                    <div key={day.day} className="relative pl-12 border-l border-cream-400">
                      <div className="absolute -left-4 top-0 bg-forest-500 text-cream-100 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
                        {day.day}
                      </div>
                      <div className="bg-cream-100 border border-cream-400 rounded-sm p-5">
                        <h3 className="font-serif text-md font-bold text-forest-600 mb-3">{day.title}</h3>
                        <div className="space-y-3">
                          {day.activities.map((act, i) => (
                            <div key={i} className="flex gap-3 text-xs border-b border-cream-300 pb-2 last:border-0">
                              <span className="text-forest-400 w-16 opacity-70">{act.time}</span>
                              <div className="flex-1">
                                <p className="font-semibold text-forest-700">{act.activity}</p>
                                <p className="text-olive-500">{act.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <div className="mt-8 flex justify-center">
              <Link to="/plan" className="bg-forest-500 text-cream-100 px-8 py-3 text-sm font-medium rounded-sm">New Trip</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center space-x-1.5 bg-cream-100/10 backdrop-blur-sm px-3 py-1.5 rounded-sm text-cream-100 border border-cream-100/10 text-[10px] uppercase">
    {icon}
    <span>{label}</span>
  </div>
);

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-serif text-xl font-bold text-forest-600 mb-4 uppercase tracking-widest">{label}</h2>
    {children}
  </div>
);

export default TripDetailsPage;
