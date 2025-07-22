import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';
import EventSteps from './EventSteps';

const Review = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        if (response.data.success) {
          setEvent(response.data.data);
        }
      } catch (err) {
        setError('Failed to load event details');
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handlePublish = async () => {
    try {
      const response = await axios.patch(`/events/${eventId}/publish`);
      if (response.data.success) {
        navigate('/organizer/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish event');
    }
  };

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Review Event</h1>
      </div>

      <EventSteps currentStep={4} />

      <div className="mt-6 md:mt-8 space-y-6 md:space-y-8">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="bg-white rounded-lg overflow-hidden shadow">
          {event.bannerImage && (
            <div className="relative w-full h-48 md:h-64">
              <img
                src={`http://localhost:5000/${event.bannerImage}`}
                alt="Event banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">{event.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-700">Date and Time</h3>
                <p className="mt-1 text-sm md:text-base">
                  {new Date(event.startDate).toLocaleDateString()}
                  <br />
                  {event.startTime} - {event.endTime}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Location</h3>
                <p className="mt-1 text-sm md:text-base">{event.location}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700">Event Description</h3>
              <p className="mt-1 text-sm md:text-base whitespace-pre-wrap">{event.description}</p>
            </div>

            {event.eventType === 'ticketed' && (
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Ticket Information</h3>
                <div className="space-y-2">
                  {event.ticketing.map((ticket, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-gray-50 rounded text-sm md:text-base"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                        <span className="font-medium">{ticket.name}</span>
                        <span className="text-gray-500 text-xs md:text-sm">
                          {ticket.quantity} tickets available
                        </span>
                      </div>
                      <span className="font-medium">₹{ticket.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 pt-4">
          <button
            type="button"
            onClick={() => navigate(`/organizer/create-event/ticketing/${eventId}`)}
            className="text-gray-600 hover:text-gray-800 transition-colors w-full md:w-auto order-2 md:order-1 py-2"
          >
            Go back to Ticketing
          </button>
          <button
            onClick={handlePublish}
            className="w-full md:w-auto px-6 py-2.5 bg-[#2B293D] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors order-1 md:order-2"
          >
            Publish Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review; 