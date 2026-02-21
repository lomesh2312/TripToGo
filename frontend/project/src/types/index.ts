export interface Trip {
  id: string;
  user_id: string;
  destination: string;
  days: number;
  budget: string;
  travel_with: string;
  trip_plan: TripPlan | null;
  created_at: string;
  updated_at: string;
}

export interface TripPlan {
  trip_name?: string;
  overview: string;
  bestTimeToVisit?: string;
  dailyItinerary: DailyItinerary[];
  hostelOptions?: HostelOption[];
  famousRestaurants?: RestaurantOption[];
  mustVisitPlaces?: LandmarkOption[];
  mustTryDishes?: DishOption[];
  estimatedTotalCost?: string;
  packingList?: string[];
  travelTips?: string[];
  localCuisine?: string[];
  transportation?: string;
  rawText?: string;
}

export interface HostelOption {
  name: string;
  price: string;
  location: string;
  description: string;
  image_keyword?: string;
}

export interface RestaurantOption {
  name: string;
  specialty: string;
  location: string;
  description: string;
  image_keyword?: string;
}

export interface LandmarkOption {
  name: string;
  description: string;
  image_keyword?: string;
}

export interface DishOption {
  name: string;
  description: string;
  image_keyword?: string;
}

export interface DailyItinerary {
  day: number;
  title: string;
  activities: Activity[];
  accommodation?: string;
  meals?: string;
}

export interface Activity {
  time: string;
  activity: string;
  description: string;
  estimatedCost?: string;
  duration?: string;
}

export interface TripFormData {
  destination: string;
  days: number;
  budget: 'cheap' | 'moderate' | 'luxury';
  travelWith: 'alone' | 'family' | 'friends' | 'couple';
  travelerCount?: number;
}
