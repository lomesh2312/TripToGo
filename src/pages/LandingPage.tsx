import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowUpRight, Star, MapPin, Users } from 'lucide-react';

export const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-cream-200">

      {/* ── HERO ── */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-black text-forest-600 leading-[0.9] tracking-tight max-w-sm">
              TRIP<br />TO GO
            </h1>
            <div className="flex flex-col items-start md:items-end justify-end gap-3 md:pt-4">
              <p className="text-olive-500 text-sm leading-relaxed max-w-[200px] md:text-right">
                The most popular and trusted AI travel planner
              </p>
              <Link
                to={user ? '/plan' : '/signup'}
                className="flex items-center space-x-1 text-xs font-medium text-forest-500 uppercase tracking-widest border-b border-forest-500 pb-0.5 hover:text-forest-600 transition-colors group"
              >
                <span>Explore Destinations</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero wide image */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="w-full h-[340px] md:h-[440px] overflow-hidden rounded-sm">
            <img
              src="https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg"
              alt="Beautiful travel destination"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* Left image */}
          <div className="h-72 md:h-96 overflow-hidden rounded-sm">
            <img
              src="https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg"
              alt="Scenic mountain path"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Center text */}
          <div className="flex flex-col justify-center px-0 md:px-4">
            <p className="text-[10px] font-medium tracking-[0.2em] text-olive-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-olive-400 inline-block" />
              About Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest-600 leading-tight mb-4">
              The Highest Level of Comfort, Convenience and Service
            </h2>
            <p className="text-olive-500 text-sm leading-relaxed mb-6">
              At TripToGo, we combine AI-powered planning with attention to detail. Whether it's a private journey tailored just for you, a shared group experience, or a seamless transfer — we take care of everything, so you can enjoy every moment.
            </p>
            <Link
              to={user ? '/plan' : '/signup'}
              className="flex items-center space-x-1.5 text-xs font-semibold text-forest-500 uppercase tracking-widest border-b border-forest-400 w-fit pb-0.5 hover:text-forest-600 group"
            >
              <span>More About Us</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Right image */}
          <div className="h-72 md:h-96 overflow-hidden rounded-sm">
            <img
              src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
              alt="Ancient architecture"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-4 border-t border-cream-400">
        <h2 className="font-serif text-2xl font-bold text-forest-600 mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Star className="h-5 w-5 text-olive-400" />}
            title="Professional Team"
            description="With years of experience in tourism, making sure you enjoy every moment."
          />
          <FeatureCard
            icon={<MapPin className="h-5 w-5 text-olive-400" />}
            title="Flexibility"
            description="From historic landmarks to airports and ports — we take you where you need to go."
          />
          <FeatureCard
            icon={<Users className="h-5 w-5 text-olive-400" />}
            title="Any Travel Style"
            description="Solo, couple, family, or friends — we have a perfect plan for every group."
          />
          <FeatureCard
            icon={<ArrowUpRight className="h-5 w-5 text-olive-400" />}
            title="AI-Powered Plans"
            description="Advanced AI crafts personalized day-by-day itineraries tailored to your preferences."
          />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="max-w-7xl mx-auto px-6 lg:px-10 py-16 mt-8">
        <div className="text-center mb-10">
          <p className="text-[10px] font-medium tracking-[0.2em] text-olive-400 uppercase mb-2 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-olive-400 inline-block" />
            Services
            <span className="w-4 h-px bg-olive-400 inline-block" />
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest-600 mb-3">What we offer?</h2>
          <p className="text-olive-500 text-sm max-w-md mx-auto leading-relaxed">
            From a private tour and a scheduled route to an accessible travel experience — we've got the perfect option for you.
          </p>
        </div>

        <ServicesGrid user={user} />
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-forest-500 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-cream-100">
            <div>
              <p className="font-serif text-5xl font-bold mb-1">195+</p>
              <p className="text-cream-300 text-sm">Countries Covered</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold mb-1">10K+</p>
              <p className="text-cream-300 text-sm">Trips Generated</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold mb-1">98%</p>
              <p className="text-cream-300 text-sm">Happy Travelers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-forest-600 mb-4">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-olive-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Join thousands of travelers who trust TripToGo for unforgettable AI-crafted experiences.
        </p>
        <Link
          to={user ? '/plan' : '/signup'}
          className="inline-flex items-center space-x-2 bg-forest-500 text-cream-100 px-8 py-3.5 text-sm font-medium hover:bg-forest-400 transition-colors duration-200 rounded-sm border border-forest-600"
        >
          <span>Create Your Trip Now</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-cream-400 py-8 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-olive-400">
          <span className="font-serif font-bold text-forest-600 text-base">TripToGo</span>
          <span>© 2026 TripToGo. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="group">
    <div className="mb-3">{icon}</div>
    <h3 className="font-semibold text-forest-600 text-sm mb-1">{title}</h3>
    <p className="text-olive-500 text-xs leading-relaxed">{description}</p>
  </div>
);

const SERVICES = [
  {
    key: 'ai',
    label: 'AI Trip Planning',
    tag: 'As You Wish',
    heading: (
      <>
        Tailored <em>AI Plans</em><br />in Seconds
      </>
    ),
    description:
      'Enjoy a personalized itinerary powered by advanced AI. These plans offer complete flexibility — visit as many or as few places as you wish, all at your own pace.',
    badge: 'Perfect for those seeking a custom experience.',
    image: 'https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg',
  },
  {
    key: 'budget',
    label: 'Budget Friendly',
    tag: 'Save Smart',
    heading: (
      <>
        Affordable <em>Adventures</em><br />for Everyone
      </>
    ),
    description:
      'Explore the world without breaking the bank. Our budget plans find the best value hotels, transport, and activities so you can travel more for less.',
    badge: 'Great for solo travelers and backpackers.',
    image: 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg',
  },
  {
    key: 'luxury',
    label: 'Luxury Experience',
    tag: 'Premium',
    heading: (
      <>
        First-Class <em>Luxury</em><br />Experiences
      </>
    ),
    description:
      'Indulge in premium hotels, private transfers, and exclusive venues. We handle every detail so you can focus entirely on the experience.',
    badge: 'Ideal for couples and special occasions.',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
  },
  {
    key: 'group',
    label: 'Group Tours',
    tag: 'Together',
    heading: (
      <>
        Memorable <em>Group</em><br />Adventures
      </>
    ),
    description:
      'We coordinate multi-person trips so everyone travels together seamlessly. From family reunions to friend getaways — we manage the complexity.',
    badge: 'Perfect for families and friend groups.',
    image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg',
  },
];

function ServicesGrid({ user }: { user: unknown }) {
  const [active, setActive] = useState('ai');
  const service = SERVICES.find((s) => s.key === active) ?? SERVICES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Tabs */}
      <div className="flex flex-col gap-2">
        {SERVICES.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`text-left px-5 py-3.5 text-sm font-medium transition-all duration-200 rounded-sm border ${active === s.key
                ? 'bg-forest-500 text-cream-100 border-forest-500'
                : 'bg-cream-100 text-olive-600 border-cream-400 hover:border-forest-300 hover:text-forest-500'
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Image */}
      <div className="h-64 lg:h-full min-h-[260px] overflow-hidden rounded-sm">
        <img
          key={service.key}
          src={service.image}
          alt={service.label}
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col justify-center">
        <p className="text-[10px] font-medium tracking-[0.2em] text-olive-400 uppercase mb-3 flex items-center gap-2">
          <span className="w-4 h-px bg-olive-400 inline-block" />
          {service.tag}
        </p>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-forest-600 leading-snug mb-4">
          {service.heading}
        </h3>
        <p className="text-olive-500 text-sm leading-relaxed mb-5">{service.description}</p>
        <div className="bg-cream-100 border border-cream-400 rounded-sm p-3 text-xs text-olive-500 mb-6 flex items-start gap-2">
          <Star className="h-4 w-4 text-forest-400 shrink-0 mt-0.5" />
          <span>{service.badge}</span>
        </div>
        <Link
          to={user ? '/plan' : '/signup'}
          className="flex items-center space-x-1.5 text-xs font-semibold text-forest-500 uppercase tracking-widest border-b border-forest-400 w-fit pb-0.5 hover:text-forest-600 group"
        >
          <span>Explore Tours</span>
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
