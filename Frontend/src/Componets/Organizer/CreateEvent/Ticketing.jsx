import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';
import EventSteps from './EventSteps';

const Ticketing = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventType, setEventType] = useState('ticketed');
  const [tickets, setTickets] = useState([
    { name: '', price: '', quantity: '' }
  ]);
  const [error, setError] = useState('');

  const handleTicketChange = (index, field, value) => {
    const newTickets = [...tickets];
    newTickets[index][field] = value;
    setTickets(newTickets);
  };

  const addTicket = () => {
    setTickets([...tickets, { name: '', price: '', quantity: '' }]);
  };

  const removeTicket = (index) => {
    if (tickets.length > 1) {
      const newTickets = tickets.filter((_, i) => i !== index);
      setTickets(newTickets);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate tickets if event is ticketed
    if (eventType === 'ticketed') {
      const isValid = tickets.every(ticket => 
        ticket.name && ticket.price && ticket.quantity && 
        parseFloat(ticket.price) >= 0 && 
        parseInt(ticket.quantity) > 0
      );

      if (!isValid) {
        setError('Please fill in all ticket details with valid values (price ≥ 0 and quantity > 0)');
        return;
      }
    }

    try {
      const response = await axios.patch(`/events/${eventId}/ticketing`, {
        eventType,
        ticketing: eventType === 'ticketed' ? tickets.map(ticket => ({
          ...ticket,
          price: parseFloat(ticket.price),
          quantity: parseInt(ticket.quantity)
        })) : []
      });

      if (response.data.success) {
        navigate(`/organizer/create-event/review/${eventId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save ticketing details');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Event Title</h1>
        <div className="text-gray-600 text-sm md:text-base mt-2">
          Location
          <br />
          Time
        </div>
      </div>

      <EventSteps currentStep={3} />

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mt-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div>
          <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">What type of event are you running?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => setEventType('ticketed')}
              className={`p-4 md:p-6 border rounded-lg flex items-center gap-3 md:gap-4 ${
                eventType === 'ticketed' ? 'border-[#2B293D] bg-gray-50' : 'border-gray-200'
              }`}
            >
              <div className="flex-1 text-left">
                <h3 className="font-medium">Ticketed Event</h3>
                <p className="text-xs md:text-sm text-gray-500">My event requires tickets to entry</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setEventType('free')}
              className={`p-4 md:p-6 border rounded-lg flex items-center gap-3 md:gap-4 ${
                eventType === 'free' ? 'border-[#2B293D] bg-gray-50' : 'border-gray-200'
              }`}
            >
              <div className="flex-1 text-left">
                <h3 className="font-medium">Free Event</h3>
                <p className="text-xs md:text-sm text-gray-500">This event is free</p>
              </div>
            </button>
          </div>
        </div>

        {eventType === 'ticketed' && (
          <div>
            <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">What tickets are you selling?</h2>
            {tickets.map((ticket, index) => (
              <div key={index} className="mb-3 md:mb-4 p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Ticket Name
                    </label>
                    <input
                      type="text"
                      value={ticket.name}
                      onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                      placeholder="Enter ticket name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">₹</span>
                      <input
                        type="number"
                        value={ticket.price}
                        onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                        className="w-full px-3 py-2 pl-8 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                      placeholder="Enter quantity"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  {tickets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTicket(index)}
                      className="text-red-500 hover:text-red-700 transition-colors py-2"
                    >
                      Remove Ticket
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addTicket}
              className="text-[#2B293D] hover:text-opacity-80 transition-colors py-2"
            >
              + Add Another Ticket
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 pt-4">
          <button
            type="button"
            onClick={() => navigate(`/organizer/create-event/banner/${eventId}`)}
            className="text-gray-600 hover:text-gray-800 transition-colors w-full md:w-auto order-2 md:order-1 py-2"
          >
            Go back to Banner
          </button>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-[#2B293D] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors order-1 md:order-2"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default Ticketing; 