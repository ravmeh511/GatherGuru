import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import EventSteps from './EventSteps';

// Simple array of categories with exact backend enum values
const categories = [
  { value: 'MUSICAL_CONCERT', label: 'Musical Concert' },
  { value: 'WEDDING', label: 'Wedding' },
  { value: 'CORPORATE_EVENT', label: 'Corporate Event' },
  { value: 'BIRTHDAY_PARTY', label: 'Birthday Party' },
  { value: 'CONFERENCE', label: 'Conference' },
  { value: 'SEMINAR', label: 'Seminar' },
  { value: 'WORKSHOP', label: 'Workshop' },
  { value: 'EXHIBITION', label: 'Exhibition' },
  { value: 'SPORTS_EVENT', label: 'Sports Event' },
  { value: 'CHARITY_EVENT', label: 'Charity Event' },
  { value: 'FOOD_FESTIVAL', label: 'Food Festival' },
  { value: 'CULTURAL_FESTIVAL', label: 'Cultural Festival' },
  { value: 'THEATER_PLAY', label: 'Theater Play' },
  { value: 'COMEDY_SHOW', label: 'Comedy Show' },
  { value: 'NETWORKING_EVENT', label: 'Networking Event' },
  { value: 'OTHER', label: 'Other' }
];

const BasicDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    scheduleType: 'single',
    startDate: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    eventType: 'free'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/events', formData);
      if (response.data.success) {
        navigate(`/organizer/create-event/banner/${response.data.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Create a New Event</h1>
      </div>

      <EventSteps currentStep={1} />

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mt-6">
        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}

        <div>
          <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Event Details</h2>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                placeholder="Enter name of your event"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                Event Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                required
              >
                <option value="">Please select one</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Date & Time</h2>
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="scheduleType"
                  value="single"
                  checked={formData.scheduleType === 'single'}
                  onChange={handleChange}
                  className="form-radio text-[#2B293D]"
                />
                <span className="ml-2">Single Event</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="scheduleType"
                  value="recurring"
                  checked={formData.scheduleType === 'recurring'}
                  onChange={handleChange}
                  className="form-radio text-[#2B293D]"
                />
                <span className="ml-2">Recurring Event</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Location</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
              Where will your event take place? *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
              placeholder="Enter event location"
              required
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Description</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
              Tell people more about your event *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B293D] focus:border-transparent"
              placeholder="Enter event description"
              required
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Event Type</h2>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="eventType"
                value="free"
                checked={formData.eventType === 'free'}
                onChange={handleChange}
                className="form-radio text-[#2B293D]"
              />
              <span className="ml-2">Free Event</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="eventType"
                value="ticketed"
                checked={formData.eventType === 'ticketed'}
                onChange={handleChange}
                className="form-radio text-[#2B293D]"
              />
              <span className="ml-2">Ticketed Event</span>
            </label>
          </div>
        </div>

        <div className="pt-4 md:pt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-[#2B293D] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Continue to Banner Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicDetails; 