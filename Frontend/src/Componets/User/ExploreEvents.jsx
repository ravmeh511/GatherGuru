import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import UserFooter from './UserFooter';
import axios from '../../utils/axios';
import { FaFilter, FaTimes } from 'react-icons/fa';

const ExploreEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter options
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Free', value: 'free' },
    { label: 'Under $25', value: 'under25' },
    { label: '$25 to $50', value: '25-50' },
    { label: 'Above $50', value: 'above50' }
  ];

  const dateRanges = [
    { label: 'Any Date', value: '' },
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'This Weekend', value: 'weekend' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' }
  ];

  const categories = [
    { label: 'All Categories', value: '' },
    { label: 'Music Concert', value: 'MUSIC_CONCERT' },
    { label: 'Food Festival', value: 'FOOD_FESTIVAL' },
    { label: 'Art Exhibition', value: 'ART_EXHIBITION' },
    { label: 'Sports Event', value: 'SPORTS_EVENT' },
    { label: 'Conference', value: 'CONFERENCE' },
    { label: 'Workshop', value: 'WORKSHOP' },
    { label: 'Comedy Show', value: 'COMEDY_SHOW' },
    { label: 'Theater Play', value: 'THEATER_PLAY' }
  ];

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, selectedPrice, selectedDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let url = '/events/all';
      const params = new URLSearchParams();
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedPrice) params.append('priceRange', selectedPrice);
      if (selectedDate) params.append('dateRange', selectedDate);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log('Fetching events from:', url);
      const response = await axios.get(url);
      console.log('Events response:', response.data);
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchEvents();
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(`/events/search?query=${searchQuery}`);
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error searching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedPrice('');
    setSelectedDate('');
  };

  return (
    <div className="min-h-screen bg-[#1C1B29]">
      <UserNavbar />

      {/* Search Header */}
      <div className="bg-[#1C1B29] text-white py-6 sm:py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Explore a world of events. Find what excites you!</h1>
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-24"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 text-sm sm:text-base"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
          {(selectedCategory || selectedPrice || selectedDate) && (
            <button
              onClick={clearFilters}
              className="text-white underline text-sm"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'fixed inset-0 z-50 bg-[#1C1B29] overflow-auto' : 'hidden'} md:relative md:block md:z-auto`}>
            <div className="bg-white rounded-lg p-4 sm:p-6">
              <div className="flex justify-between items-center md:hidden mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="hidden md:block mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setShowFilters(false);
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price</h3>
                <div className="space-y-2">
                  {priceRanges.map((price) => (
                    <label key={price.value} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        value={price.value}
                        checked={selectedPrice === price.value}
                        onChange={(e) => {
                          setSelectedPrice(e.target.value);
                          setShowFilters(false);
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Date</h3>
                <div className="space-y-2">
                  {dateRanges.map((date) => (
                    <label key={date.value} className="flex items-center">
                      <input
                        type="radio"
                        name="date"
                        value={date.value}
                        checked={selectedDate === date.value}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setShowFilters(false);
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{date.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply Filters Button (Mobile Only) */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center text-white py-12">
                <p className="text-lg mb-2">No events found</p>
                <p className="text-gray-400">Try adjusting your filters or search for something else</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-200"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    <div className="relative h-48">
                      <img
                        src={`http://localhost:5000/${event.bannerImage}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x200?text=Event+Image';
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                          {event.category.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-600 font-medium">
                          {formatDate(event.startDate)}
                        </span>
                        <span className="text-sm text-gray-500">📍 {event.location}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        By {event.organizer?.organization || event.organizer?.name || 'Unknown Organizer'}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">
                          {event.eventType === 'free' ? 'Free' : 
                            event.ticketing && event.ticketing.length > 0 
                              ? `$${Math.min(...event.ticketing.map(t => t.price))}` 
                              : 'TBA'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default ExploreEvents; 