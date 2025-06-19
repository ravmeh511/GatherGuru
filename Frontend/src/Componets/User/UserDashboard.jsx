import React from 'react';
import UserNavbar from './UserNavbar';
import UserFooter from './UserFooter';
import Video from '../../assets/user_hero.mp4'

export const UserDashboard = () => {
  return (
    <div className="bg-white text-gray-800">
      <UserNavbar />

      {/* Hero Section with Video */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={Video}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 text-white max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold">Don't miss out!</h1>
          <p className="mt-2 text-base md:text-lg">Explore the vibrant events happening locally and globally.</p>
          <input
            type="text"
            placeholder="Search events..."
            className="mt-4 px-4 py-2 rounded-lg w-full max-w-md text-black"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Music', 'Food & Drink', 'Adventure', 'Tech', 'Workshops'].map((cat) => (
            <div key={cat} className="bg-gray-100 px-6 py-3 rounded-full shadow hover:shadow-md cursor-pointer">
              <p>{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Event Sections */}
      <EventSection title="Popular Events in Your City" />
      <EventSection title="Discover Best of Online Events" />
      <EventSection title="Trending Events around the World" />

      {/* Personalized Events */}
      <section className="bg-yellow-200 py-10 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Events specially curated for you!</h2>
        <button className="bg-[#1c1b29] text-white px-6 py-2 rounded-md hover:bg-[#292841] transition">View Suggestions</button>
      </section>

      {/* Footer */}
      <UserFooter />
    </div>
  );
};

const EventSection = ({ title }) => (
  <section className="py-10 px-4">
    <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((id) => (
        <div key={id} className="bg-white shadow-md overflow-hidden">
          <div className="relative h-48">
            <img
              src="https://img.freepik.com/premium-photo/tent-camping-night-with-party-light-background-people-tent-camping_31965-123017.jpg"
              alt={`Event ${id}`}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">Travel & Adventure</span>
            <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:scale-105 transition">
              ☆
            </button>
          </div>
          <div className="p-4">
            <div className="text-sm text-blue-700 font-bold mb-1">NOV 25 - 26</div>
            <h3 className="font-semibold text-lg mb-1">Lakeside Camping at Pawna</h3>
            <p className="text-sm text-gray-600 mb-2">Adventure Geek - Explore the Unexplored</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>₹1,400</span>
              <span>★ 14 interested</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-4">
      <button className="bg-[#1c1b29] text-white px-6 py-2 rounded-md hover:bg-[#292841] transition">See More</button>
    </div>
  </section>
);