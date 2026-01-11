import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, MapPin, Calendar, DollarSign, Users, Plane, Globe, Heart } from 'lucide-react';

export const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1118877/pexels-photo-1118877.jpeg"
            alt="Travel background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 to-blue-900/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Plan Your Dream Trip with{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              AI Magic
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Discover personalized travel itineraries crafted by AI. Your perfect adventure awaits!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={user ? '/plan' : '/signup'}
              className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              <span>Start Planning Now</span>
            </Link>
            <Link
              to="#features"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gradient-to-b from-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                TripToGo?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make travel planning effortless and exciting with AI-powered personalization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="AI-Powered"
              description="Advanced AI creates personalized itineraries tailored to your preferences"
              color="from-yellow-400 to-orange-500"
            />
            <FeatureCard
              icon={<MapPin className="h-8 w-8" />}
              title="Any Destination"
              description="Explore any corner of the world with detailed local insights"
              color="from-green-400 to-emerald-500"
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title="Budget Friendly"
              description="Choose from cheap, moderate, or luxury options that fit your wallet"
              color="from-blue-400 to-cyan-500"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Any Travel Style"
              description="Perfect plans for solo travelers, couples, families, and friends"
              color="from-pink-400 to-rose-500"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Globe className="h-12 w-12" />
              </div>
              <h3 className="text-4xl font-bold mb-2">195+</h3>
              <p className="text-cyan-100">Countries Covered</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Plane className="h-12 w-12" />
              </div>
              <h3 className="text-4xl font-bold mb-2">10,000+</h3>
              <p className="text-cyan-100">Trips Generated</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Heart className="h-12 w-12" />
              </div>
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p className="text-cyan-100">Happy Travelers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <div className="space-y-6">
                <Step
                  number="1"
                  title="Tell Us Your Dream"
                  description="Share your destination, travel dates, budget, and who you're traveling with"
                  icon={<MapPin className="h-6 w-6" />}
                />
                <Step
                  number="2"
                  title="AI Creates Magic"
                  description="Our AI analyzes millions of data points to craft your perfect itinerary"
                  icon={<Sparkles className="h-6 w-6" />}
                />
                <Step
                  number="3"
                  title="Start Your Journey"
                  description="Get a detailed day-by-day plan with activities, costs, and local tips"
                  icon={<Plane className="h-6 w-6" />}
                />
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
                alt="Travel planning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-xl">
                <p className="text-lg font-semibold">Start planning in seconds!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of travelers who trust TripToGo for unforgettable experiences
          </p>
          <Link
            to={user ? '/plan' : '/signup'}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <Sparkles className="h-6 w-6" />
            <span>Create Your Trip Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} text-white mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Step = ({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xl shadow-lg">
        {number}
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-2">
        <div className="text-cyan-600">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);
