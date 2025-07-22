import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';
import UserNavbar from './UserNavbar';
import UserFooter from './UserFooter';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`/events/${eventId}`);
      setEvent(response.data.data);
      if (response.data.data.ticketing?.length > 0) {
        setSelectedTicket(response.data.data.ticketing[0]);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch event details');
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (!user) {
      // If user is not logged in, redirect to login page with return URL
      navigate(`/user/login?redirect=/events/${eventId}`);
      return;
    }

    if (!selectedTicket && event.eventType !== 'free') {
      alert('Please select a ticket type');
      return;
    }

    // Here you can implement the booking logic
    // For now, we'll just show an alert
    alert('Booking functionality will be implemented soon!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error || 'Event not found'}</div>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Event Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Banner Image */}
          <div className="relative h-[400px]">
            <img
              src={`http://localhost:5000/${event.bannerImage}`}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x400?text=Event+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-semibold">
                  {event.category.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                </span>
                <button className="bg-white/90 text-gray-800 rounded-full p-2 hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
              <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              <p className="text-lg opacity-90">By {event.organizer?.organization || event.organizer?.name}</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Left Column - Event Information */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#2B293D] p-3 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date and Time</p>
                      <p className="font-semibold">{formatDate(event.startDate)}</p>
                      <p className="text-gray-600">{event.startTime} {event.endTime && `- ${event.endTime}`}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-[#2B293D] p-3 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Ticket Information */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold mb-4">
                  {event.eventType === 'free' ? 'Free Event' : 'Select Tickets'}
                </h2>
                
                {event.eventType === 'free' ? (
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">This is a free event. Register now to secure your spot!</p>
                    <button 
                      onClick={handleBooking}
                      className="w-full bg-[#2B293D] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      Register Now
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {event.ticketing?.map((ticket, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedTicket?.name === ticket.name
                              ? 'border-[#2B293D] bg-[#2B293D]/5'
                              : 'border-gray-200 hover:border-[#2B293D]'
                          }`}
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{ticket.name}</h3>
                              <p className="text-sm text-gray-600">{ticket.quantity} tickets left</p>
                            </div>
                            <span className="text-lg font-bold">${ticket.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedTicket && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Tickets
                        </label>
                        <select
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2B293D]"
                        >
                          {[...Array(Math.min(10, selectedTicket.quantity))].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <p className="text-sm text-gray-600 mt-2">
                          Total: ${selectedTicket.price * quantity}
                        </p>
                      </div>
                    )}
                    <button 
                      onClick={handleBooking}
                      className="w-full bg-[#2B293D] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                    >
                      Book Now
                    </button>
                  </>
                )}

                <div className="mt-6 text-center">
                  <button className="text-gray-600 hover:text-[#2B293D] text-sm flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Need help?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Events Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Events You May Like</h2>
          {/* Add similar events grid here */}
        </div>
      </main>

      <UserFooter />
    </div>
  );
};

export default EventDetails; 